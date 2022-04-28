import { inject, reactive, computed } from "vue"
const storeKey = 'store'

// 返回一个实例对象
export function createStore(options) {
  return new Store(options)
}

export class Store {
  constructor(options) {
    this._actions = Object.create(null)
    this._mutations = Object.create(null)
    this._wrappedGetters = Object.create(null)
    // 初始化module
    this._modules = new ModuleCollection(options)

    const store = this
    const { dispatch, commit } = this

    this.dispatch = function (type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function (type, payload, options) {
      return commit.call(store, type, payload, options)
    }

    const state = this._modules.root.state

    installModule(this, state, [], this._modules.root)

    // state 和 getters
    resetStoreState(this, state)

  }

  // app.use(store)
  install(app, injectKey) {
    app.provide(injectKey || storeKey, this)
  }

  get state() {
    // resetStoreState中注册的state、getters
    return this._state.data
  }
  commit(type, payload) {
    const entry = this._mutations[type]
    entry.forEach((handler) => {
      handler(payload)
    })
  }
  dispatch(type, payload) {
    const entry = this._actions[type]
    const result = entry.length > 1
      ? Promise.all(entry.map(handler => handler(payload)))
      : entry[0](payload)

    return new Promise((resolve, reject) => {
      result.then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

}

// 组件中使用useStore
export function useStore(key = null) {
  return inject(key !== null ? key : storeKey)
}

// 处理state getters
function resetStoreState(store, state) {
  store._state = reactive({
    data: state
  })

  store.getters = {}
  const wrappedGetters = store._wrappedGetters
  const computedObj = {}
  const computedCache = {}

  forEachValue(wrappedGetters, (fn, key) => {

    computedObj[key] = partial(fn, store)
    computedCache[key] = computed(() => computedObj[key]())
    Object.defineProperty(store.getters, key, {
      get: () => computedCache[key].value,
      enumerable: true
    })
  })
}

function partial(fn, arg) {
  return function () {
    return fn(arg)
  }
}

class ModuleCollection {
  constructor(rawRootModule) { // options
    this.register([], rawRootModule, false)
  }

  get(path) {
    return path.reduce((module, key) => {
      return module.getChild(key)
    }, this.root)
  }

  register(path, rawModule, runtime = true) { // options
    const newModule = new Module(rawModule, runtime)
    if (path.length === 0) {
      this.root = newModule
    } else {
      // const parent = this.get(path.slice(0, -1))
      // parent.addChild(path[path.length - 1], newModule)
    }
  }

  getNamespace(path) {
    let module = this.root
    return path.reduce((namespace, key) => {
      module = module.getChild(key)
      return namespace + (module.namespaced ? key + '/' : '')
    }, '')
  }
}

class Module {
  // options
  constructor(rawModule) {
    this._children = Object.create(null)

    this._rawModule = rawModule // options里面配置的state
    const rawState = rawModule.state

    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }

  // addChild(key, module) {
  //   this._children[key] = module
  // }

  getChild(key) {
    return this._children[key]
  }

  forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }

  forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }

  forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }
}

// store, state, [], this._modules.root
function installModule(store, rootState, path, module) {
  // 以rootState为例
  const namespace = store._modules.getNamespace(path)

  const local = {
    dispatch: store.dispatch,
    commit: store.commit,
  }
  Object.defineProperties(local, {
    getters: {
      get: () => store.getters
    },
    state: {
      get: () => getNestedState(store.state, path)
    }
  })

  module.context = local

  /**
   const mutations = {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    }
  }
   */
  // 注册mutations
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    // options.mutations里面的某个函数
    // console.log('111', namespacedType, mutation)
    registerMutation(store, namespacedType, mutation, local)
  })

  // 注册actions
  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })
}

function getNestedState(state, path) {
  return path.reduce((state, key) => state[key], state)
}

function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

// 注册mutations
// store 'increment', () => {state.count++}, 
// entry: {
//    increments: [() => { state.count++ },]
//    decrements: [() => { state.count-- },]
// }
function registerMutation(store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = [])
  // 数组
  entry.push(function (payload) {
    handler.call(store, local.state, payload)
  })
}

function registerAction(store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])

  entry.push(function (payload) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    return res
  })
}
// rawGetter：单项getter
function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    return
  }
  store._wrappedGetters[type] = function wrappedGetter(store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  }
}


function isPromise(val) {
  return val && typeof val.then === 'function'
}

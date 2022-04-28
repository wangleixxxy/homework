let Vue;

class Store {
  constructor(options) { // 创建store实例
    console.log('options', options)
    const { state, mutations, actions, getters } = options

    this._mutations = mutations
    this._actions = actions

    if (getters) {
      this.handleGetters(getters)
    }

    // state 使用vue实例实现数据双向绑定
    this._vm = new Vue({
      data: {
        $$state: state
      }
    })
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  // 提交mutation
  commit(type, payload) {
    const entry = this._mutations[type]
    if (entry) {
      entry(this.state, payload)
    }
  }
  // 提交action
  dispatch(type, payload) {
    const entry = this.actions[type]
    if (entry) {
      entry(this, payload)
    }
  }
  // 获取state
  get state() {
    // console.log('this._vm', this._vm)
    return this._vm.$data.$$state
  }
  // 处理getters 
  handleGetters(getters) {
    this.getters = {}
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](this.state)
      })
    })
  }
}

function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {
  install,
  Store,
}

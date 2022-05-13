function objectassign(target, ...source) {
  if (!source || !source.length) return target
  let len = source.length
  for (let i = 0; i < len; i++) {
    let item = source[i]
    for (let key in item) {
      target[key] = item[key]
    }
  }
  return target
}

function polyfillObjectAssign() {
  // 必须是 writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assignPolyfill', {
    value: function assign(target, varsArgs) {
      if (target === null || target === undefined) {
        throw new TypeError('参数报错')
      }
      var to = Object(target)
      for (let i = 1; i < arguments.length; i++) {
        let nextSource = arguments[i]
        if (nextSource !== null || nextSource !== undefined) {
          for (let nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    enumerable: false,
    configurable: true
  })
}

let target = { x: 1, a: 1 }
let a = { a: 2 }
let b = { b: 2 }

// let res = objectassign(target, a, b)

polyfillObjectAssign()
let res = Object.assignPolyfill(target, a, b)
console.log(res)

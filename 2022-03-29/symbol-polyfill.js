/**
 * 实现symbol polyfill
 */

// Object.create() 返回一个新对象，实现唯一性的核心
/**
 * 1. 使用new就报错
 * 2. 如果参数 description 为 undefined，descString 为 undefined
 * 3. 否则，descString 为 ToString(descString)
 * 4. 如果 descString 报错就返回
 * 5. 返回一个新的 唯一的 值，内部属性 [[Description]] 值为 descString
 */
(function(){
  const root = this

  // Symbol作为对象唯一属性名
  const generateName = (function() {
    var postfix = 0
    return function(descString) {
      postfix++
      return '@@' + descString + '_' + postfix
    }
  })()

  const SymbolPolyfill = function(description) {
    if (this instanceof SymbolPolyfill) {
      throw new TypeError('不能使用new!')
    }

    let descString = description === undefined ? '' : String(description)

    const symbol = Object.create({
      // 显式转为字符串
      toString() {
        // return 'Symbol(' + this.__description__ + ')'
        // 对象作为对象属性名，会进行隐式转换，如果返回的一个字符串，导致重名，不得已模拟的时候，返回一个一个唯一值__name__
        return this.__name__
      },
      valueOf() {
        return this
      }
    })

    // 内部属性 [[Description]]
    Object.defineProperties(symbol, {
      '__description__': {
        value: descString,
        configurable: false,
        writable: false,
        enumerable: false
      },
      '__name__': {
        value: generateName(descString),
        configurable: false,
        writable: false,
        enumerable: false
      }
    })
    return symbol
  }
  
  // for、keyFor
  var registry = Object.create(null)
  Object.defineProperties(SymbolPolyfill, {
    for: {
      value: function(key) {
        if (registry[key]) {
          return registry[key]
        }
        return (registry[key] = SymbolPolyfill(String(key)))
      },
      configurable: true, // 这里
      writable: true, // 这里
      enumerable: false
    },
    keyFor: {
      value: function(symbol) {
        for (let key in registry) {
          if (registry[key] === symbol) {
            return key
          }
        }
        return undefined
      },
      configurable: true, // 这里
      writable: true, // 这里
      enumerable: false
    }
  })

  
  root.SymbolPolyfill = SymbolPolyfill
})()

// console.log(new SymbolPolyfill('test')) // TypeError: 不能使用new!
// console.log(SymbolPolyfill('test')) // {__description__: 'test'}

// console.log(String(Symbol('test'))) // 'Symbol(test)'
// console.log(String(SymbolPolyfill('test'))) // '@@test_1'

// 对象属性
// const obj = {}
// obj[SymbolPolyfill('foo')] = 1
// obj[SymbolPolyfill('foo')] = 2
// console.log(obj) // { '@@foo_1': 1, '@@foo_2': 2 } // 两个值，ok

// 与其他类型的值进行运算
let a = Symbol('1')
let a1 = SymbolPolyfill('1')
// console.log(a + 1) // TypeError: Cannot convert a Symbol value to a number
console.log(a1 + 1) // @@1_11

// 显示调用不报错，返回Symbol值
let b = a.valueOf()
// console.log(b, typeof b) // Symbol(1), symbol
let b1 = a1.valueOf()
// console.log(b1, typeof b1) // {} object

let c = Symbol('hello')
// console.log(Symbol.for('hello')) // 返回之前的symbol类型的 Symbol(hello)

let c1 = SymbolPolyfill('hello')
// console.log(SymbolPolyfill.for('hello')) // Object.create()创建的不同对象


let s1 = Symbol.for("foo");
console.log('s1', Symbol.keyFor(s1)) // "foo"

let s2 = Symbol("foo");
console.log('s2', Symbol.keyFor(s2)) // undefined


let s3 = SymbolPolyfill.for("foo");
console.log('s3', SymbolPolyfill.keyFor(s3)) // "foo"

let s4 = Symbol("foo");
console.log('s4', SymbolPolyfill.keyFor(s4)) // undefined

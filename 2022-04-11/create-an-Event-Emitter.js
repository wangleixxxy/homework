class EventEmitter {
  constructor() {
    this.map = new Map()
  }
  subscribe(eventName, callback) {
    if (!eventName) {
      return
    }
    if (callback && typeof callback === 'function') {
      if (this.map.has(eventName)) {
        this.map.get(eventName).push(callback)
      } else {
        this.map.set(eventName, [callback])
      }
    }
    const that = this
    return {
      release() {
        if (that.map.has(eventName)) {
          that.map.get(eventName).pop()
          if (that.map.get(eventName).length === 0) {
            that.map.delete(eventName)
          }
        }
      }
    }
  }

  emit(eventName, ...args) {
    if (!eventName) return
    let arr = this.map.get(eventName)
    if (arr && arr.length) { // 非空判断
      arr.forEach(fn => {
        fn.apply(null, args)
      })
    }
  }
}

function callback1() { }
function callback2() { }
function callback3() { }
const emitter = new EventEmitter()
const sub1 = emitter.subscribe('event1', callback1)
const sub2 = emitter.subscribe('event2', callback2)

// 同一个callback可以重复订阅同一个事件
const sub3 = emitter.subscribe('event1', callback1)

console.log(emitter)

// emitter.emit('event1', 1, 2);

sub1.release()
console.log(222, emitter)
sub3.release()
console.log(333, emitter)

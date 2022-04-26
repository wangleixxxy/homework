/**
 * 
实现一个LazyMan，可以按照以下方式调用:
    LazyMan(“Hank”)输出:
    Hi! This is Hank!

    LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
    Hi! This is Hank!
    //等待10秒..
    Wake up after 10
    Eat dinner~

    LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
    Hi This is Hank!
    Eat dinner~
    Eat supper~

    LazyMan(“Hank”).eat(“supper”).sleepFirst(5)输出
    //等待5秒
    Wake up after 5
    Hi This is Hank!
    Eat supper
 */

class LazyManClass {
  constructor(name) {
    this.tasks = []
    const task = () => {
      console.log(`Hi! This is ${name}!`)
      this.next()
    }
    this.tasks.push(task)

    setTimeout(() => {
      this.next()
    }, 0)
  }
  next() {
    if (this.tasks.length) {
      const task = this.tasks.shift()
      task()
    }
  }
  sleep(time, isFirst = false) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next()
      }, time * 1000)
    }
    if (isFirst) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
    return this
  }
  eat(food) {
    const task = () => {
      console.log(`Eat ${food}~`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }
  sleepFirst(time) {
    this.sleep(time, true)
    return this
  }
}

// 初始化调用 不是直接返回实例
let LazyMan = (name) => {
  return new LazyManClass(name)
}

LazyMan("Hank").sleep(3).eat("dinner")

// LazyMan('Hank').eat('dinner').eat('supper')

// LazyMan('Hank').eat('supper').sleepFirst(5)

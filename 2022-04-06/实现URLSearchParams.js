/**
 * 如果我们要从query中提取数据的话，可以使用 URLSearchParams ，非常方便。
 * 你能否自己实现一个和URLSearchParams基本一样的MyURLSearchParams？
 */
/*
const params = new MyURLSearchParams('?a=1&a=2&b=2')
params.get('a') // '1'
params.getAll('a') // ['1', '2']
params.get('b') // '2'
params.getAll('b') // ['2']


params.append('a', 3)
params.set('b', '3')
params.toString() // 'a=1&a=2&b=3&a=3'
 */

class MyURLSearchParams {
  /**
   * @params {string} init
   */
  constructor(init) {
    if (!init) return ''
    if (init[0] === '?') {
      init = init.substring(1, init.length)
    }
    this.map = new Map()
    let arr = init.split('&')
    arr.forEach(item => {
      let list = item.split('=')
      this.append(list[0], list[1])
    })
  }
  
  /** 
   * @params {string} name
   * @params {any} value
   */
  append(name, value) {
    // 类型判断
    if (typeof value !== 'string') {
      value = String(value)
    }
    if (this.map.has(name)) {
      this.map.get(name).push(value)
    } else {
      this.map.set(name, [value])
    }
  }
  
  /**
   * @params {string} name
   */
  delete(name) {
    // 返回null
    if (!this.map.has(name)) return null
    this.map.delete(name)
  }
  
  /**
   * @returns {Iterator} 
   */
  *entries() {
    for (let [key, value] of this.map) {
      for (let v of value) {
        yield [key, v]
      }
    }
  }
  
  /**
   * @param {(value, key) => void} callback
   */
  forEach(callback) {
    for (let [key, value] of this.map) {
      for (let v of value) {
        callback(v, key)
      }
    }
  }
  
  /**
   * @param {string} name
   * returns the first value of the name
   */
  get(name) {
    if (!name || !this.map.has(name)) return null
    return this.map.get(name)[0]
  }
  
  /**
   * @param {string} name
   * @return {string[]}
   * returns the value list of the name
   */
  getAll(name) {
    if (!name || !this.map.has(name)) return []
    return this.map.get(name)
  }
  
  /**
   * @params {string} name
   * @return {boolean}
   */
  has(name) {
    return this.map.has(name)
  }
  
  /**
   * @return {Iterator}
   */
  keys() {
    return this.map.keys()
  }
  
  /**
   * @param {string} name
   * @param {any} value
   */
  set(name, value) {
    // 类型判断
    if (typeof value !== 'string') {
      value = String(value)
    }
    this.map.set(name, [value])
  }
  
  // sor all key/value pairs based on the keys
  sort() {
    let arr = []
    for (let item of this.map) {
      arr.push(item[0])
    }
    let map = new Map()
    arr.sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })
    arr.forEach(k => {
      let list = this.map.get(k)
      map.set(k, list)
    })
    this.map = map
  }
  
  /**
   * @return {string}
   */
  toString() {
    let str = ''
    for (let [key, value] of this.map) {
      for (let v of value) {
        str += `${key}=${v}&`
      }
    }
    return str.substring(0, str.length - 1)
  }
  
  /**
   * @return {Iterator} values
   */
  values() {
    let arr = []
    // for (let [k, value] of this.map) {
    //   for (let v of value) {
    //     arr.push(v)
    //   }
    // }
    this.map.forEach((value, key) => {
      arr.push(...(value.map(x => x)))
    })
    return arr
  }
}

const params = new MyURLSearchParams('c=2&a=2&a=1&a=2&b=2')
console.log([...params.entries()])
// expect([...params.entries()]).toEqual([['c','2'],['a','2'],['a','1'],['a','2'],['b','2']])
params.sort()
console.log([...params.entries()])
// expect([...params.entries()]).toEqual([['a','2'],['a','1'],['a','2'],['b','2'],['c','2'],])



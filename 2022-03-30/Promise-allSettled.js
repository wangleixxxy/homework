/**
 * Promise.allSettled()方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，
 * 并带有一个对象数组，每个对象表示对应的promise结果。
 * 和Promise.all()不同，Promise.allSettled() 会等待所有的promise直到fulfill或者reject。
 */

/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  if (promises.length === 0) {
    return Promise.resolve([])
  }
  let result = []
  let len = promises.length
  let count = 0
  return new Promise((resolve) => {
    for (let i = 0; i < len; i++) {
      // 使用Promise.resolve执行拿到每个promises[i]的返回结果
      Promise.resolve(promises[i])
        .then(res => {
          result[i] = { status: 'fulfilled', value: res }
        })
        .catch((reason) => {
          // 返回值类型
          result[i] = { status: 'rejected', reason: reason }
        })
        .finally(() => {
          count++
          if (count === len) {
            resolve(result)
          }
        })
    }
  })
}

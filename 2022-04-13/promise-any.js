/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function any(promises) {
  return new Promise((resolve, reject) => {
    let count = 0
    let len = promises.length
    let errors = new Array(len)
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i])
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          count++
          errors[i] = err
          if (count === len) {
            reject(new AggregateError(
              'No Promise in Promise.any was resolved',
              errors
            ))
          }
        })
    }
  })
}

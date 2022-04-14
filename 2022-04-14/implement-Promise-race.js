/**
 * implement-Promise-race
 */

/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function race(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  })
}

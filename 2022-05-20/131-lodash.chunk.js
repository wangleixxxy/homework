/**
 * 131. 实现_.chunk()
 * https://bigfrontend.dev/zh/problem/implement-lodash-chunk
 * 
 * _.chunk() 可以用来按一定长度分割数组。
 * 请实现chunk(arr: any[], size: number)。
 * 如果size小于0，返回空数组即可。
 */


/**
 * 
 * @param {any[]} 
 * @param {number}
 */
function chunk(arr, size) {
  if (!size || size < 0) return []
  let result = []
  let temp = []
  let len = arr.length
  for (let i = 0; i < len; i++) {
    temp.push(arr[i])
    if ((i + 1) % size === 0) {
      result.push(temp)
      temp = []
    }
  }
  if (temp.length) {
    result.push(temp)
  }
  console.log(size, result)
  return result
}


chunk([1, 2, 3, 4, 5], 1)
// [[1], [2], [3], [4], [5]]

chunk([1, 2, 3, 4, 5], 2)
// [[1, 2], [3, 4], [5]]

chunk([1, 2, 3, 4, 5], 3)
// [[1, 2, 3], [4, 5]]

chunk([1, 2, 3, 4, 5], 4)
// [[1, 2, 3, 4], [5]]

chunk([1, 2, 3, 4, 5], 5)
// [[1, 2, 3, 4, 5]]

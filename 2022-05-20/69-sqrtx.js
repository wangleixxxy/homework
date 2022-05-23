/**
 * 69. x 的平方根 
 * https://leetcode.cn/problems/sqrtx/
 */

/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  let left = 0
  let right = x
  while (left <= right) {
    let mid = (left + right) >> 1
    let result = mid * mid
    if (result === x) {
      return mid
    } else if (result < x) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return right
};

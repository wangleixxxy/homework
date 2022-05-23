/**
 * 278. 第一个错误的版本
 * https://leetcode.cn/problems/first-bad-version/
 */
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 1
    let right = n
    while (left < right) {
      // console.log(left, right)
      // let mid = (left + right) >> 1
      const mid = Math.floor((left + right) / 2);
      if (isBadVersion(mid)) {
        right = mid
      } else {
        // left = mid
        left = mid + 1 // 直接到mid后一个
      }
    }

    return left
  };
};

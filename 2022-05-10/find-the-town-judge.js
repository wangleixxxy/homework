/**
 * 997. 找到小镇的法官
 * https://leetcode.cn/problems/find-the-town-judge/
 */
/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (n, trust) {
  if (n === 1) return 1
  if (!trust.length) return -1
  let len = trust.length
  let arr = new Array(n + 1).fill(0)
  for (let i = 0; i < len; i++) {
    arr[trust[i][0]]--
    arr[trust[i][1]]++
  }
  // console.log(arr)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n - 1) {
      return i
    }
  }
  return -1
};
// 时间N 空间N

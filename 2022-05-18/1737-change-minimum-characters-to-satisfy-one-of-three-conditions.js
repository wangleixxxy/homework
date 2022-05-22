/**
 * 1737. 满足三条件之一需改变的最少字符数
 * https://leetcode.cn/problems/change-minimum-characters-to-satisfy-one-of-three-conditions/
 */
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var minCharacters = function (a, b) {
  let arrA = new Array(26).fill(0)
  let arrB = new Array(26).fill(0)

  let aLen = a.length
  let bLen = b.length

  let aSum = bSum = 0
  let res = Number.MAX_SAFE_INTEGER
  for (let c of a) {
    arrA[c.charCodeAt() - 'a'.charCodeAt()]++
  }
  for (let c of b) {
    arrB[c.charCodeAt() - 'a'.charCodeAt()]++
  }

  // 到25
  for (let i = 0; i < 25; i++) {
    aSum += arrA[i]
    bSum += arrB[i]
    res = Math.min(
      res,
      aLen - aSum + bSum, // 改变a
      bLen - bSum + aSum, // 改变b
      aLen + bLen - arrA[i] - arrB[i] // 3
    )
  }
  // z特殊处理
  return Math.min(res, aLen + bLen - arrA[25] - arrB[25])
};

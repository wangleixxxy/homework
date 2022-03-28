// https://leetcode-cn.com/problems/add-to-array-form-of-integer/
/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
 var addToArrayForm = function(num, k) {
  let len1 = num.length
  let kStr = '' + k
  let len2 = kStr.length
  let i = len1 - 1
  let j = len2 - 1
  let arr = new Array(Math.max(len1, len2)).fill(0)
  let m = arr.length - 1
  let temp = 0
  while (i >= 0 && j >= 0) {
      let sum = temp + num[i] + parseFloat(kStr[j])
      arr[m] = sum % 10
      temp = (sum / 10) | 0
      i--
      j--
      m--
  }
  while (i >= 0) {
      let sum = temp + num[i]
      arr[m] = sum % 10
      temp = (sum / 10) | 0
      i--
      m--
  }
  while (j >= 0) {
      let sum = temp + parseFloat(kStr[j])
      arr[m] = sum % 10
      temp = (sum / 10) | 0
      j--
      m--
  }
  if (temp) {
      arr.unshift(1)
  }
  return arr
};
// 方法2
var addToArrayForm = function(num, k) {
  let len1 = num.length
  let len2 = ('' + k).length
  let res = new Array(Math.max(len1, len2)).fill(0)
  let i = len1 - 1
  let m = res.length - 1
  let temp = 0
  while (i >= 0 || k !== 0) {
      let x = i >= 0 ? num[i] : 0
      let y = k ? k % 10 : 0
      let sum = x + y + temp
      res[m] = sum % 10

      temp = (sum / 10) | 0
      k = (k / 10) | 0
      i--
      m--
  }
  if (temp) {
      res.unshift(temp)
  }
  return res
};

/**
 * 1456. 定长子串中元音的最大数目
 * https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
 */
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  let set = new Set(['a', 'e', 'i', 'o', 'u'])
  let len = s.length
  let max = 0
  let m = 0
  let n = k - 1
  for (let i = 0; i <= n; i++) {
    if (set.has(s[i])) max++
  }
  m++
  n++
  let count = max
  while (m <= len - k && n < len) {
    if (set.has(s[m - 1])) count--
    if (set.has(s[n])) count++
    max = Math.max(max, count)
    m++
    n++
  }
  return max
};
// 时间N 空间1

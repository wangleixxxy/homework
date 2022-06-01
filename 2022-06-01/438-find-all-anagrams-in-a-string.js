/**
 * 438. 找到字符串中所有字母异位词
 * https://leetcode.cn/problems/find-all-anagrams-in-a-string/
 */
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  let need = new Map()
  let window = new Map()
  for (let c of p) {
    need.set(c, (need.get(c) || 0) + 1)
  }

  let left = right = 0
  let len = s.length
  let valid = 0
  let res = []
  while (right < len) {
    let c = s[right]
    right++
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1)
      // console.log(window) // 保证合法的长度和need的长度相同，判断窗口长度，即结果
      if (window.get(c) === need.get(c)) {
        valid++
      }
    }
    if (right - left === p.length) {
      if (valid === need.size) {
        res.push(left)
      }
      let d = s[left]
      left++
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--
        }
        window.set(d, window.get(d) - 1)
      }
    }
  }
  return res
};

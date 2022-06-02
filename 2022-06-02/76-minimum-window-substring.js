/**
 * 76. 最小覆盖子串
 * https://leetcode.cn/problems/minimum-window-substring/
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let need = new Map()
  for (let c of t) {
    need.set(c, (need.get(c) || 0) + 1)
  }
  // console.log(need)
  let window = new Map()
  let left = right = start = 0
  let valid = 0
  let len = Number.MAX_SAFE_INTEGER
  while (right < s.length) {
    let c = s[right]
    right++
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1)
      if (window.get(c) === need.get(c)) {
        valid++
      }
      // console.log(window, valid)
    }
    // 不是t.length
    while (valid === need.size) {
      if (right - left < len) {
        start = left
        len = right - left
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
  return len === Number.MAX_SAFE_INTEGER ? '' : s.substr(start, len)
};

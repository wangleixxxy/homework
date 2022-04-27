/**
 * 3. 无重复字符的最长子串
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // 时间N 空间N
  if (!s) return 0
  let left = 0
  let max = 0
  let len = s.length // 无重复的最左侧的下标
  let map = new Map()
  for (let i = 0; i < len; i++) {
    if (map.has(s[i])) {
      // 发现重复的向右移动1
      left = Math.max(left, map.get(s[i]) + 1)
    }
    map.set(s[i], i)
    max = Math.max(max, i - left + 1)
  }
  return max
};

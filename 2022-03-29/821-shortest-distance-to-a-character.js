/**
 * 821. 字符的最短距离
 * https://leetcode-cn.com/problems/shortest-distance-to-a-character/
 */

/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */

// 时间复杂度 O(N^2）
// 空间复杂度 O(N)
var shortestToChar = function(s, c) {
  let len = s.length
  let res = []
  for (let i = 0; i < len; i++) {
      res.push(findShortest(i, c))
  }
  return res

  function findShortest(k, c) {
    let i = j = k
    let min = 0
    while (i >= 0 || j <= len - 1) {
        if (i < 0) i = 0
        if (j > len - 1) j = len - 1
        if (s[i] === c && s[j] === c) {
            min = Math.min(Math.abs(i - k), Math.abs(j - k))
            return min
        } else if (s[i] === c) {
            min = Math.abs(i - k)
            return min
        } else if (s[j] === c) {
            min = Math.abs(j - k)
            return min
        }
        i--
        j++
    }
  }
};


// 方法2
// 时间N 空间N
var shortestToChar = function(s, c) {
  // 两次遍历 左 -> 右，右 -> 左
  let len = s.length
  let res = []
  let prev = Number.MIN_SAFE_INTEGER / 2
  // 第一次遍历
  for (let i = 0; i < len; i++) {
      if (s[i] === c) {
          prev = i
      }
      res[i] = Math.abs(i - prev)
  }
  // 第二次遍历
  for (let i = len - 1; i >= 0; i--) {
      if (s[i] === c) {
          prev = i
      }
      res[i] = Math.min(res[i], Math.abs(i - prev))
  }
  return res
};

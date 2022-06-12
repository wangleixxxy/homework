/**
 * 52. N皇后 II
 * https://leetcode.cn/problems/n-queens-ii/
 */
var totalNQueens = function (n) {
  let count = 0
  dfs(0, 0, 0, 0,)
  return count

  function dfs(row, cols, pie, na) {
    if (row >= n) {
      count++
      return
    }
    let bits = ~(cols | pie | na) & ((1 << n) - 1)
    while (bits) {
      let p = -bits & bits
      bits &= bits - 1
      dfs(row + 1, cols | p, (pie | p) << 1, (na | p) >> 1)
    }
  }
}

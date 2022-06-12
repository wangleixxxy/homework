/**
 * 695. 岛屿的最大面积
 * https://leetcode.cn/problems/max-area-of-island/
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]]
  let max = -Number.MAX_SAFE_INTEGER
  let m = grid.length
  let n = grid[0].length
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      max = Math.max(max, dfs(i, j))
    }
  }
  return max

  function dfs(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) {
      return 0
    }
    grid[i][j] = 0 // 如果是1，没有遍历过，手动赋值0，不再遍历,下面的ans初始值也就是1开始了

    let ans = 1
    for (let k = 0; k < dirs.length; k++) {
      let x = i + dirs[k][0]
      let y = j + dirs[k][1]
      ans += dfs(x, y)
    }
    return ans
  }
};

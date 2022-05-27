/**
 * 778. 水位上升的泳池中游泳
 * https://leetcode.cn/problems/swim-in-rising-water/
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function (grid) {
  let dirs = [[-1, 0], [1, 0], [0, 1], [0, -1]]
  let n = grid.length
  let left = 0
  let right = n * n - 1 // 0个 到 n * n - 1个格子
  while (left < right) {
    let mid = (left + right) >> 1
    let visited = new Array(n).fill().map(() => new Array(n).fill(false))
    if (grid[0][0] <= mid && dfs(grid, 0, 0, visited, mid)) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left

  function dfs(grid, x, y, visited, diff) {
    visited[x][y] = true
    for (let i = 0; i < dirs.length; i++) {
      let newX = x + dirs[i][0]
      let newY = y + dirs[i][1]
      if (inArea(newX, newY) && grid[newX][newY] <= diff && !visited[newX][newY]) {
        if (newX === n - 1 && newY === n - 1) {
          return true
        }
        if (dfs(grid, newX, newY, visited, diff)) {
          return true
        }
      }
      // visited[x][y] = false
    }
    return false
  }
  function inArea(x, y) {
    return x >= 0 && x < n && y >= 0 && y < n
  }
};

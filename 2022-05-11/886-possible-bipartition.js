/**
 * 886. 可能的二分法
 * https://leetcode.cn/problems/possible-bipartition/
 */
/**
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
var possibleBipartition = function (n, dislikes) {
  let color = new Array(n + 1).fill(false)
  let visited = new Array(n + 2).fill(false)
  let ok = true // 分组成功

  let graph = buildGraph(n, dislikes)
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      traverse(graph, i)
    }
  }
  return ok
  // 构建图
  function buildGraph(n, dislikes) {
    let graph = new Array(n + 1).fill().map(() => new Array())
    let len = dislikes.length
    for (let i = 0; i < len; i++) {
      const [v, w] = dislikes[i]
      graph[v].push(w)
      graph[w].push(v)
    }
    return graph
  }
  // 深度遍历
  function traverse(graph, v) {
    if (!ok) return // 不符合条件直接返回
    visited[v] = true // 已经访问过了
    for (let w of graph[v]) {
      if (!visited[w]) {
        // 没有访问过
        color[w] = !color[v] // 染成不同颜色
        traverse(graph, w) // 深度遍历接下来的w
      } else {
        // 已经访问过 判断颜色是否一致
        if (color[w] === color[v]) {
          ok = false
        }
      }
    }
  }
};

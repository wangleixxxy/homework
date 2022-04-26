/**
 * 447. 回旋镖的数量
 * https://leetcode-cn.com/problems/number-of-boomerangs/
 */
/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function (points) {
  // v字形，某两个点到某一点的距离相同
  let len = points.length
  let ans = 0
  for (let i = 0; i < len; i++) {
    const map = new Map()
    for (let j = 0; j < len; j++) {
      const dist = help(points[i], points[j])
      map.set(dist, (map.get(dist) || 0) + 1)
    }
    // 求组合数
    for (let [k, v] of map) {
      ans += v * (v - 1)
    }
  }
  return ans

  function help(x, y) {
    return Math.pow((x[0] - y[0]), 2) + Math.pow((x[1] - y[1]), 2)
  }
};
// 时间N^2 空间N

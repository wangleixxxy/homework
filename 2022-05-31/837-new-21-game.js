/**
 * 837. 新 21 点
 * https://leetcode.cn/problems/new-21-game/
 */
/**
 * @param {number} n
 * @param {number} k
 * @param {number} w
 * @return {number}
 */
var new21Game = function (n, k, w) {
  // dp[x]: 手上牌面为x时，获胜的概率
  let dp = new Array(k + w)
  let s = 0
  // >= k时，停止抽牌，前面几次的和 + 本次大于K的牌，不管本次多少，都会停止，所以要么赢要么输
  for (let i = k; i < k + w; i++) {
    dp[i] = i <= n ? 1 : 0
    s += dp[i]
  }
  // 从 k - 1 开始，计算出dp[0]
  for (let i = k - 1; i >= 0; i--) {
    dp[i] = s / w
    s = s - dp[i + w] + dp[i] // -
  }
  return dp[0]
};

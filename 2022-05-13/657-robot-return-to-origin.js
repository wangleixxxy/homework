/**
 * 657. 机器人能否返回原点
 * https://leetcode.cn/problems/robot-return-to-origin/
 */
/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function (moves) {
  const step = {
    'U': [0, 1],
    'D': [0, -1],
    'L': [-1, 0],
    'R': [1, 0]
  }
  const init = [0, 0]
  for (const s of moves) {
    const item = step[s]
    init[0] += item[0]
    init[1] += item[1]
  }
  return init[0] === 0 && init[1] === 0
};

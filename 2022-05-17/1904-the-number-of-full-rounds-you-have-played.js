/**
 * 1904. 你完成的完整对局数
 * https://leetcode.cn/problems/the-number-of-full-rounds-you-have-played/
 */
/**
 * @param {string} loginTime
 * @param {string} logoutTime
 * @return {number}
 */
var numberOfRounds = function (loginTime, logoutTime) {
  let start = 60 * parseInt(loginTime.substring(0, 2)) + parseInt(loginTime.substring(3, 5))
  let end = 60 * parseInt(logoutTime.substring(0, 2)) + parseInt(logoutTime.substring(3, 5))
  let ans = 0
  // 加一天
  if (start > end) {
    end += 60 * 24
  }

  // 结束日期向下取整，可能提前退出
  // 开始日期向上取整，进入的时机是下一个新的开始
  ans = Math.floor(end / 15) - Math.ceil(start / 15)
  return Math.max(ans, 0)
};
// 时间1 空间1

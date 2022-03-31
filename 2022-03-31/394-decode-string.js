/**
 * 394. 字符串解码
 * https://leetcode-cn.com/problems/decode-string/
 */
// 方法1 递归
 var decodeString = function(s) {
  let len = s.length
  return dfs(s, 0)

  function dfs(s, i) {
      let num = 0
      let res = ''
      while (i < len) {
          // 数字 重复次数
          if (isNum(s[i])) {
              num = num * 10 + parseInt(s[i])
          } else if (s[i] === '[') {
              // 如果[]中还有[],这里用递归处理
              let arr = dfs(s, i + 1)
              i = arr[0]
              // 重复次数为0时 停止
              while (num) {
                  res += arr[1]
                  num--
              }
          } else if (s[i] === ']') {
              return [i, res]
          } else {
              res += s[i]
          }
          i++
      }
      return res
  }
  
  function isNum(str) {
      return str.charCodeAt() >= '0'.charCodeAt() && str.charCodeAt() <= '9'.charCodeAt()
  }
};

// 方法2 栈
var decodeString = function(s) {
  let len = s.length
  let stack = []
  let curStr = ''
  let curNum = 0
  for (let i = 0; i < len; i++) {
      if (isNum(s[i])) {
          curNum = curNum * 10 + parseInt(s[i])
      } else if (s[i] === '[') {
          stack.push(curStr)
          stack.push(curNum)
          curStr = ''
          curNum = 0
      } else if (s[i] === ']') {
          let prevNum = stack.pop()
          let prevStr = stack.pop()
          curStr = prevStr + curStr.repeat(prevNum)
      } else {
          curStr += s[i]
      }
  }
  return curStr
  
  function isNum(str) {
      return str.charCodeAt() >= '0'.charCodeAt() && str.charCodeAt() <= '9'.charCodeAt()
  }
};

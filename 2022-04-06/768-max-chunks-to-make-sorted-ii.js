/**
 * 768. 最多能完成排序的块 II
 */
/**
 * @param {number[]} arr
 * @return {number}
 */
// 单调栈 时间N 空间N
var maxChunksToSorted = function(arr) {
  let len = arr.length
  let stack = []
  let max = -1
  for (let i = 0; i < len; i++) {
      // 大于max时，更新max值，放入栈中
      if (arr[i] > max) {
          max = arr[i]
          stack.push(arr[i])
      } else {
          // 比较栈顶和当前值，如果栈顶 > 当前值，出栈，最后放入最大值，又开始新的一组
          while (stack.length && stack[stack.length - 1] > arr[i]) {
              stack.pop()
          }
          stack.push(max)
      }
  }
  return stack.length
};

/**
 * 769. 最多能完成排序的块
 */
/**
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted = function(arr) {
  // let ans = 0
  // let len = arr.length
  // let max = 0
  // for (let i = 0; i < len; i++) {
  //     max = Math.max(max, arr[i])
  //     if (max === i) {
  //         ans++
  //     }
  // }
  // return ans

  // 方法2 单调栈
  let stack = []
  let max = -1
  let len = arr.length
  for (let i = 0; i < len; i++) {
      if (arr[i] > max) {
          max = arr[i]
          stack.push(arr[i])
      } else {
          while (stack.length && stack[stack.length - 1] > arr[i]) {
              stack.pop()
          }
          stack.push(max)
      }
  }
  return stack.length
};

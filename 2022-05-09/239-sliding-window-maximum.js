/**
 * 239. 滑动窗口最大值
 * https://leetcode.cn/problems/sliding-window-maximum/
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  class MyQueue {
    constructor() {
      this.arr = []
    }
    shift(val) {
      if (this.arr.length && val === this.front()) {
        this.arr.shift()
      }
    }
    push(val) {
      // 使单调递减
      while (this.arr.length && val > this.tail()) {
        this.arr.pop()
      }
      this.arr.push(val)
    }
    front() {
      return this.arr[0]
    }
    tail() {
      return this.arr[this.arr.length - 1]
    }
  }
  if (!nums || !nums.length) return []
  let len = nums.length
  let res = []
  let queue = new MyQueue()
  for (let i = 0; i < k; i++) {
    queue.push(nums[i])
  }
  res.push(queue.front())
  for (let i = k; i < len; i++) {
    queue.shift(nums[i - k])
    queue.push(nums[i])
    res.push(queue.front())
  }
  return res
};

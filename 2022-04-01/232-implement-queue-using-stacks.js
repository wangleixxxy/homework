/**
 * 232. 用栈实现队列
 * https://leetcode-cn.com/problems/implement-queue-using-stacks/
 */
var MyQueue = function() {
  this.stack1 = []
  this.stack2 = []
};

/** 
* @param {number} x
* @return {void}
*/
MyQueue.prototype.push = function(x) {
  let len2 = this.stack2.length
  for (let i = 0; i < len2; i++) {
      this.stack1.push(this.stack2.pop())
  }
  this.stack1.push(x)
};

/**
* @return {number}
*/
MyQueue.prototype.pop = function() {
  let len1 = this.stack1.length
  for (let i = 0; i < len1; i++) {
      this.stack2.push(this.stack1.pop())
  }
  if (!this.stack2.length) return
  return this.stack2.pop()
};

/**
* @return {number}
*/
MyQueue.prototype.peek = function() {
  let len1 = this.stack1.length
  for (let i = 0; i < len1; i++) {
      this.stack2.push(this.stack1.pop())
  }
  if (!this.stack2.length) return
  return this.stack2[this.stack2.length - 1]
};

/**
* @return {boolean}
*/
MyQueue.prototype.empty = function() {
  return !this.stack1.length && !this.stack2.length
};

/**
* Your MyQueue object will be instantiated and called as such:
* var obj = new MyQueue()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.peek()
* var param_4 = obj.empty()
*/

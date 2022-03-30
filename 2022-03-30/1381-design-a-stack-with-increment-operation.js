/**
 * 1381. 设计一个支持增量操作的栈
 * https://leetcode-cn.com/problems/design-a-stack-with-increment-operation/
 */
/**
 * @param {number} maxSize
 */
 var CustomStack = function(maxSize) {
  this.stack = [] // 初始化的时候不要设置长度
  this.maxSize = maxSize
};

/** 
* @param {number} x
* @return {void}
*/
CustomStack.prototype.push = function(x) {
  if (this.stack.length < this.maxSize) {
      this.stack.push(x)
  }
};

/**
* @return {number}
*/
CustomStack.prototype.pop = function() {
  if (this.stack.length) {
      let x = this.stack.pop()
      return x
  } else {
      return -1
  }
};

/** 
* @param {number} k 
* @param {number} val
* @return {void}
*/
CustomStack.prototype.increment = function(k, val) {
  let len = this.stack.length
  for (let i = 0; i < len && i < k; i++) {
      this.stack[i] += val
  }
};

/**
* Your CustomStack object will be instantiated and called as such:
* var obj = new CustomStack(maxSize)
* obj.push(x)
* var param_2 = obj.pop()
* obj.increment(k,val)
*/

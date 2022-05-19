/**
 * 1834. 单线程 CPU
 * https://leetcode.cn/problems/single-threaded-cpu/
 */
/**
 * @param {number[][]} tasks
 * @return {number[]}
 */
var getOrder = function (tasks) {
  tasks = tasks.map((t, index) => [...t, index])
  tasks.sort((a, b) => b[0] - a[0]) // 从大到小排序，使用pop方法取任务
  // 执行任务队列,不是双端队列
  // 队首出队，队尾入队
  const queue = new MinPriorityQueue({
    compare: (x, y) => {
      // 执行时间不同，取最短
      if (x[1] !== y[1]) {
        return x[1] - y[1]
      }
      // 执行时间相同，取下标最小
      return x[2] - y[2]
    }
  })
  let curT = tasks[tasks.length - 1][0] // 当前时间
  let res = []
  while (tasks.length || queue.size()) {
    while (tasks.length && curT >= tasks[tasks.length - 1][0]) {
      queue.enqueue(tasks.pop()) // 时间复杂度1
    }
    if (queue.size()) {
      const [t, p, index] = queue.dequeue()
      curT += p
      res.push(index)
    } else if (tasks.length) {
      curT = tasks[tasks.length - 1][0]
    }
  }
  return res
};

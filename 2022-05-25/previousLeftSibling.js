/**
 * 158. 返回DOM tree中”左边“的元素
 * @param {*} root 
 * @param {*} target 
 * @returns 
 */
// 层序遍历
function previousLeftSibling(root, target) {
  let queue = [root]
  while (queue.length) {
    let size = queue.length
    let prev = null // 记录
    for (let i = 0; i < size; i++) {
      let current = queue.shift()
      if (current === target) {
        return prev
      }
      prev = current // 更新prev
      queue.push(...current.children)
    }
  }
  return null
}

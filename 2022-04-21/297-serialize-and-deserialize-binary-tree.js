/**
 * 297. 二叉树的序列化与反序列化
 * https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
// DFS
var serialize = function (root) {
  if (!root) return 'X'
  let left = serialize(root.left)
  let right = serialize(root.right)
  return root.val + ',' + left + ',' + right
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if (data === 'X') return null
  let list = data.split(',')
  return dfs(list)

  // 返回节点
  function dfs(list) {
    let val = list.shift()
    if (val === 'X') return null
    let node = new TreeNode(val)
    node.left = dfs(list)
    node.right = dfs(list)
    return node
  }
};


// BFS
var serialize = function (root) {
  if (!root) return 'X'
  let res = []
  let queue = [root]
  while (queue.length) {
    let size = queue.length
    for (let i = 0; i < size; i++) {
      let node = queue.shift()
      if (node) {
        res.push(node.val)
        queue.push(node.left)
        queue.push(node.right)
      } else {
        res.push('X')
      }
    }
  }
  // console.log(res)
  return res.join(',')
};

var deserialize = function (data) {
  if (data === 'X') return null
  let list = data.split(',')
  let rootVal = list[0]
  let root = new TreeNode(rootVal)
  let queue = [root]
  let index = 1
  while (index < list.length) {
    let leftVal = list[index]
    let rightVal = list[index + 1]
    let node = queue.shift()
    if (leftVal !== 'X') {
      let left = new TreeNode(leftVal)
      node.left = left
      queue.push(left)
    }
    if (rightVal !== 'X') {
      let right = new TreeNode(rightVal)
      node.right = right
      queue.push(right)
    }
    index += 2
  }
  return root
};

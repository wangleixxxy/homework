/**
 * 513. 找树左下角的值
 * https://leetcode-cn.com/problems/find-bottom-left-tree-value/
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function (root) {
  let res = []
  let queue = [root]

  while (queue.length) {
    let currentLevel = []
    let currentSize = queue.length
    for (let i = 0; i < currentSize; i++) {
      let node = queue.shift()
      currentLevel.push(node.val)
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
    res.push(currentLevel)
  }

  return res[res.length - 1][0]
};

var findBottomLeftValue = function (root) {
  // dfs
  let res = []
  dfs(root, 0)
  return res[res.length - 1][0]

  function dfs(root, depth) {
    if (!root) return
    res[depth] = res[depth] || []
    res[depth].push(root.val)
    dfs(root.left, depth + 1)
    dfs(root.right, depth + 1)
  }
};

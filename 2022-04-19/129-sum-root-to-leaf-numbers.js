/**
 * 129. 求根节点到叶节点数字之和
 * https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/
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
var sumNumbers = function (root) {
  if (!root) return 0
  let res = []
  help(root, root.val)

  let result = 0
  for (let i = 0; i < res.length; i++) {
    result += res[i]
  }
  return result

  function help(root, ans) {
    if (!root.left && !root.right) {
      res.push(ans)
      return root.val
    }
    if (root.left) {
      help(root.left, ans * 10 + root.left.val)
    }
    if (root.right) {
      help(root.right, ans * 10 + root.right.val)
    }
  }


};

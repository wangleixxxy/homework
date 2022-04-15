/**
 * 104. 二叉树的最大深度
 * https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
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
var maxDepth = function (root) {
  // if (!root) return 0
  // let left = maxDepth(root.left)
  // let right = maxDepth(root.right)
  // return Math.max(left, right) + 1

  // 方法2
  // return help(root, 0)
  // function help(root, depth) {
  //     if (!root) return 0
  //     let left = help(root.left, depth + 1)
  //     let right = help(root.right, depth + 1)
  //     return Math.max(left, right) + 1
  // }

  // 方法2变形
  return help(root, 0)
  function help(root, depth) {
    if (!root) return depth
    let left = help(root.left, depth + 1)
    let right = help(root.right, depth + 1)
    return Math.max(left, right)
  }
};

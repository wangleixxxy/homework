/**
 * 109. 有序链表转换二叉搜索树
 * https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
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
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  return help(head, null)

  function help(left, right) {
    if (left === right) return null
    let midNode = getMid(left, right)
    let midTree = new TreeNode(midNode.val)
    midTree.left = help(left, midNode)
    midTree.right = help(midNode.next, right)
    return midTree
  }

  // 更简洁
  function getMid(left, right) {
    let f = s = left
    while (f !== right && f.next !== right) {
      s = s.next
      f = f.next.next
    }
    return s
  }
  function getMid2(left, right) {
    let len = count = 0
    let f = left
    while (f && f !== right) { // 判断条件
      f = f.next
      len++
    }
    count = (len >> 1) | 0
    let c = 0
    f = left
    while (f && f !== right) { // 判断条件
      if (c === count) {
        return f
      }
      f = f.next
      c++ // 这里记得增加
    }
    return left
  }
};

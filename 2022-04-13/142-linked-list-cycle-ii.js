/**
 * 142. 环形链表 II
 * https://leetcode-cn.com/problems/linked-list-cycle-ii/
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let f = s = p = head
  while (f && f.next) {
    s = s.next
    f = f.next.next
    if (f === s) {
      while (p !== s) {
        p = p.next
        s = s.next
      }
      return s
    }
  }
  return null
};

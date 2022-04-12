/**
 * 160. 相交链表
 * https://leetcode-cn.com/problems/intersection-of-two-linked-lists/
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  // 双指针
  let head1 = headA
  let head2 = headB
  while (head1 !== head2) {
    head1 = head1 !== null ? head1.next : headB
    head2 = head2 !== null ? head2.next : headA
  }
  return head1
};
// 时间N 空间1

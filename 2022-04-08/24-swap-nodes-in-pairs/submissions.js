/**
 * 24. 两两交换链表中的节点
 */
var swapPairs = function(head) {
  if (!head) return head
  let dummy = node = new ListNode()
  dummy.next = head

  while (node && node.next && node.next.next) {
      let p1 = node.next
      let p2 = node.next.next

      node.next = p2
      p1.next = p2.next
      p2.next = p1

      node = p1
  }
  return dummy.next
};

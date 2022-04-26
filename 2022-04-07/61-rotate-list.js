/**
 * 61. 旋转链表
 */
var rotateRight = function (head, k) {
    if (!head) return head
    let len = 0
    let dummy = new ListNode()
    dummy.next = head
    let f = s = head
    while (f) {
        f = f.next
        len++
    }
    k = k % len
    if (k === 0) return head

    f = s = head
    while (k) {
        f = f.next
        k--
    }
    while (f && f.next) {
        f = f.next
        s = s.next
    }

    let p = s.next
    s.next = null
    f.next = head
    dummy.next = p
    return dummy.next
};

/**
 * Kth Pair Distance
 * https://binarysearch.com/problems/Kth-Pair-Distance
 */
class Solution {
  solve(nums, k) {
    k++ //
    nums.sort((a, b) => a - b) // 排序后用二分法
    let len = nums.length
    let left = 0
    let right = nums[len - 1] - nums[0]
    while (left < right) {
      let mid = Math.floor((left + right) / 2) // 差值
      let leftp = 0
      let amt = 0
      for (let i = 1; i < len; i++) {
        while (nums[i] - nums[leftp] > mid) {
          leftp++
        }
        amt += i - leftp
      }
      if (amt >= k) {
        right = mid
      } else {
        left = mid + 1
      }
    }
    return left
  }
}

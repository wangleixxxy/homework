/**
 * 路灯最小半径
 */
class Solution {
  solve(nums) {
    if (!nums.length) return 0
    nums.sort((a, b) => a - b)
    let n = nums.length
    let left = 0
    let right = nums[n - 1] - nums[0]
    while (left <= right) {
      let mid = (left + right) >> 1
      if (isCover(nums, mid)) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    return (left / 2)
  }
}

function isCover(nums, radius) {
  let left = nums[0]
  let right = left + radius
  for (let i = 0; i < 3; i++) {
    let j = searchRight(nums, right)
    if (j >= nums.length) return true
    left = nums[j]
    right = left + radius
  }
  return false
}

function searchRight(nums, target) {
  let left = 0
  let right = nums.length
  while (left < right) {
    let mid = (left + right) >> 1
    if (target < nums[mid]) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left
}

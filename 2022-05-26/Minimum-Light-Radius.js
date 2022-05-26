/**
 * 路灯最小半径
 */
class Solution {
  solve(nums) {
    if (nums.length <= 3) return 0; // 小于3个灯，不需要路灯
    nums.sort((a, b) => a - b) // 先排序
    let len = nums.length
    let l = 0 // 左边界
    let r = nums[len - 1] // 右边界
    // 初始化
    while (l < r) {
      let mid = (l + r) >> 1
      if (good(mid)) { // 如果当前路灯的半径能够满足要求，则更新右边界
        r = mid
      } else {
        l = mid + 1 // 否则更新左边界
      }
    }
    return l / 2; // 返回最小半径

    // 判断是否满足要求
    function good(range) {
      let end = nums[0] + range // 当前路灯的结束位置
      let ct = 0 // 当前路灯的个数
      for (let i = 0; i < len; i++) {
        if (nums[i] > end) {
          ct++
          end = nums[i] + range
        }
      }
      return ct <= 2 // 如果当前路灯的个数小于等于2，则满足要求
    }
  }
}



// class Solution {
//   solve(nums) {
//     if (!nums.length) return 0
//     nums.sort((a, b) => a - b)
//     let n = nums.length
//     let left = 0
//     let right = nums[n - 1] - nums[0]
//     while (left <= right) {
//       let mid = (left + right) >> 1
//       if (isCover(nums, mid)) {
//         right = mid - 1
//       } else {
//         left = mid + 1
//       }
//     }
//     return (left / 2)
//   }
// }

// function isCover(nums, radius) {
//   let left = nums[0]
//   let right = left + radius
//   for (let i = 0; i < 3; i++) {
//     let j = searchRight(nums, right)
//     if (j >= nums.length) return true
//     left = nums[j]
//     right = left + radius
//   }
//   return false
// }

// function searchRight(nums, target) {
//   let left = 0
//   let right = nums.length
//   while (left < right) {
//     let mid = (left + right) >> 1
//     if (target < nums[mid]) {
//       right = mid
//     } else {
//       left = mid + 1
//     }
//   }
//   return left
// }

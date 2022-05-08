/**
 * 35. 搜索插入位置
 * https://leetcode-cn.com/problems/search-insert-position/
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let len = nums.length
  let i = 0
  let j = len - 1
  while (i <= j) {
    let mid = Math.ceil((i + j) / 2)
    if (target > nums[mid]) {
      i = mid + 1
    } else if (target < nums[mid]) {
      j = mid - 1
    } else {
      return mid
    }
  }
  return i
};

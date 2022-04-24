/**
 * 1. 两数之和
 * https://leetcode-cn.com/problems/two-sum/
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let len = nums.length
  let map = new Map()
  for (let i = 0; i < len; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i]
    } else {
      map.set(nums[i], i)
    }
  }
  return []
};
// 时间N 空间N

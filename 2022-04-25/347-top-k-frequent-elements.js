/**
 * 347. 前 K 个高频元素
 * https://leetcode-cn.com/problems/top-k-frequent-elements/
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  let map = new Map()
  let len = nums.length
  for (let i = 0; i < len; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1)
  }
  let arr = []
  for (let [k, v] of map) {
    if (arr[v]) {
      arr[v].push(k)
    } else {
      arr[v] = [k]
    }
  }

  let j = arr.length - 1
  let res = []
  while (k > 0 && j >= 0) {
    if (arr[j]) {
      res = res.concat(arr[j])
      k -= arr[j].length
    }
    j--
  }
  return res
};

// 时间N 空间N

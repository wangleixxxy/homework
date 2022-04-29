/**
 * Delete Sublist to Make Sum Divisible By K
 */
// 1590. 使数组和能被 P 整除
// 前缀和 + 同余定理
var minSubarray = function (nums, p) {
  let allSum = 0
  let len = nums.length
  let res = len
  for (let i = 0; i < len; i++) {
    allSum += nums[i]
  }
  if (allSum < p) return -1

  let mod = allSum % p
  if (mod === 0) return 0

  let preSum = 0
  // 前缀和 % p的余数 : 下标
  let map = new Map()
  map.set(0, -1)
  for (let i = 0; i < len; i++) {
    // 当前和
    preSum += nums[i]
    let curMod = preSum % p
    let target = (curMod - mod + p) % p
    if (map.has(target)) {
      res = Math.min(res, i - map.get(target))
    }
    map.set(curMod, i)
  }
  return res === len ? -1 : res
};
// 时间N 空间N

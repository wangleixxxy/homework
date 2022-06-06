/**
 * Number-of-Operations-to-Decrement-Target-to-Zero 删除的数字的和为target的最少步骤
 */
function solve(nums, target) {
  if (target < 0) return -1;
  if (target === 0) return 0;
  if (!nums || !nums.length) return -1
  let ans = Number.MAX_SAFE_INTEGER
  let sum = 0
  let len = nums.length
  for (let i = 0; i < len; i++) {
    sum += nums[i]
  }
  if (sum === target) return len

  target = sum - target
  let map = new Map()
  let t = 0
  for (let i = 0; i < len; i++) {
    t += nums[i]
    if (t === target) {
      ans = Math.min(ans, n - 1 - i)
    }
    if (map.has(t - target)) {
      ans = Math.min(ans, n - (i - map.get(t - target)))
    }
    map.set(t, i)
  }
  return ans === Number.MAX_SAFE_INTEGER ? -1 : ans
}

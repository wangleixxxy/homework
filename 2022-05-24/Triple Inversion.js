/**
 * https://binarysearch.com/problems/Triple-Inversion
 */
class Solution {
  solve(nums) {
    let ans = 0
    mergeSort(nums, 0, nums.length - 1)
    return ans

    function mergeSort(nums, left, right) {
      if (left >= right) return
      let mid = (left + right) >> 1
      mergeSort(nums, left, mid)
      mergeSort(nums, mid + 1, right)
      merge(nums, left, mid, right)
    }

    function merge(nums, left, mid, right) {
      let i = left
      let j = mid + 1
      let temp = new Array(right - left + 1)
      let k = 0
      let t = left
      while (i <= mid && j <= right) {
        // temp[k++] = nums[i] < nums[j] ? nums[i++] : nums[j++]
        // if (nums[i] > nums[j] * 3) {
        //     ans++
        // }

        if (nums[i] > nums[j]) {
          while (t <= mid && nums[t] <= nums[j] * 3) {
            t++
          }
          ans += (mid - t + 1)
          temp[k++] = nums[j++]
        } else {
          temp[k++] = nums[i++]
        }
      }
      while (i <= mid) {
        temp[k++] = nums[i++]
      }
      while (j <= right) {
        temp[k++] = nums[j++]
      }
      for (let p = 0; p < temp.length; p++) {
        nums[left + p] = temp[p]
      }
    }
  }
}

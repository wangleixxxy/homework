/**
 * 912. 排序数组
 * https://leetcode.cn/problems/sort-an-array/
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  mergeSort(nums, 0, nums.length - 1)
  return nums

  function mergeSort(arr, left, right) {
    if (left >= right) return
    let mid = (left + right) >> 1
    mergeSort(arr, left, mid)
    mergeSort(arr, mid + 1, right)
    merge(arr, left, mid, right)
  }

  function merge(arr, left, mid, right) {
    let i = left
    let j = mid + 1
    let temp = new Array(right - left + 1)
    let k = 0

    while (i <= mid && j <= right) {
      temp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++]
    }

    while (i <= mid) {
      temp[k++] = arr[i++]
    }
    while (j <= right) {
      temp[k++] = arr[j++]
    }

    for (let p = 0; p < temp.length; p++) {
      arr[left + p] = temp[p]
    }
  }
};

// 快排
var sortArray1 = function (nums) {
  quickSort(nums, 0, nums.length - 1)
  return nums

  function quickSort(arr, left, right) {
    if (left >= right) return
    let pivot = partition(arr, left, right)
    quickSort(arr, left, pivot - 1)
    quickSort(arr, pivot + 1, right)
  }

  function partition(arr, left, right) {
    let pivot = right;
    let begin = left;
    for (let i = left; i < right; i++) {
      if (arr[i] < arr[pivot]) {
        [arr[i], arr[begin]] = [arr[begin], arr[i]]
        begin++
      }
    }
    [arr[pivot], arr[begin]] = [arr[begin], arr[pivot]]
    return begin
  }

}

let nums = [3, 1, 2, 4, 5]
let res = sortArray1(nums, 0, nums.length - 1)
console.log(nums);

/**
 * 987. 二叉树的垂序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  if (!root) return []
  let map = new Map()
  help(root, 0, 0)
  for (let [key, val] of map) {
    val.sort((a, b) => {
      if (a.row < b.row) {
        return -1
      } else if (a.row === b.row) {
        return a.val - b.val
      } else {
        return 0
      }
    })
  }
  // console.log(map)

  let res = []
  Array.from(map).sort((a, b) => a[0] - b[0]).forEach(item => {
    let arr = []
    for (let it of item[1]) {
      arr.push(it.val)
    }
    res.push(arr)
  })
  // console.log('res', res)
  return res

  function help(root, row, col) {
    if (!root) return
    if (map.has(col)) {
      map.get(col).push({
        val: root.val,
        row,
        col
      })
    } else {
      map.set(col, [{
        val: root.val,
        row,
        col
      }])
    }

    help(root.left, row + 1, col - 1)
    help(root.right, row + 1, col + 1)
  }
};

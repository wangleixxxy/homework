/**
 * 1203. 项目管理
 * https://leetcode.cn/problems/sort-items-by-groups-respecting-dependencies/
 */
/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */
var sortItems = function (n, m, group, beforeItems) {
  const groupItem = new Array(n + m).fill(0).map(() => [])

  // 组和组 关系图
  const groupGraph = new Array(n + m).fill(0).map(() => [])
  // 组内关系图
  const itemGraph = new Array(n).fill(0).map(() => [])

  // 组和组入度数组
  const groupDegree = new Array(n + m).fill(0)
  // 组内入度数组
  const itemDegree = new Array(n).fill(0)

  const id = new Array(n + m).fill(0).map((i, index) => index)

  let leftId = m // 已经有m个小组了，给没有归属的项目分配一个小组，就从m开始算起了
  for (let i = 0; i < group.length; i++) {
    if (group[i] === -1) {
      group[i] = leftId
      leftId++
    }
    groupItem[group[i]].push(i) // 每一个项目都有归属的小组
  }
  console.log('groupItem', groupItem)

  // 依赖关系建图
  for (let i = 0; i < group.length; i++) {
    const curGroupId = group[i] // i === 2时，得到1
    for (const item of beforeItems[i]) {
      const beforeGroupId = group[item] // 1
      // group[i] 和 before中的group[x]是否同一个组
      if (beforeGroupId === curGroupId) {
        itemDegree[i]++
        itemGraph[item].push(i)
      } else {
        groupDegree[curGroupId]++
        groupGraph[beforeGroupId].push(curGroupId)
      }
    }
  }

  // console.log('groupDegree', groupDegree) // [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0 ]
  console.log('groupGraph', groupGraph)
  console.log('id', id)
  // 组和组 拓扑关系排序
  const groupTopSort = topSort(groupDegree, groupGraph, id)
  console.log('groupTopSort', groupTopSort)
  if (!groupTopSort.length) {
    return []
  }

  // 组内拓扑关系排序
  const ans = []
  for (const curGroupId of groupTopSort) {
    const size = groupItem[curGroupId].length
    if (size === 0) continue

    const res = topSort(itemDegree, itemGraph, groupItem[curGroupId])
    if (!res.length) return []

    for (const item of res) {
      ans.push(item)
    }
  }
  return ans


  function topSort(deg, graph, items) {
    const queue = []
    for (const item of items) {
      if (deg[item] === 0) { // 哪个下标的值为0，queue放入下标
        queue.push(item)
      }
    }
    const res = []
    console.log('queue', queue)
    while (queue.length) {
      const u = queue.shift()
      res.push(u)
      // [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0 ]
      for (let i = 0; i < graph[u].length; i++) {
        const v = graph[u][i]
        if (--deg[v] === 0) {
          queue.push(v)
        }
      }
    }
    return res.length === items.length ? res : []
  }
};

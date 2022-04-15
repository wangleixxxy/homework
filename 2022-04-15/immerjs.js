/**
 * 164.实现Immer的produce()
 */
/**
 * @param {any} base
 * @param {(draft: any) => any} recipe
 * @returns {any}
 */
function produce(base, recipe) {
  const copy = deepClone(base)
  recipe(copy)
  if (deepCompare(base, copy)) {
    return base
  }
  return copy
}

function deepClone(base) {
  if (Array.isArray(base)) {
    return deepCloneArray(base)
  }
  return deepCloneObj(base)
}

function deepCloneArray(base) {
  const output = []
  for (let item of base) {
    if (typeof item === 'object') {
      output.push(deepCloneObj(item))
    } else {
      output.push(item)
    }
  }
  return output
}
function deepCloneObj(base) {
  const output = {}
  for (let key of Object.keys(base)) {
    if (typeof base[key] === 'object') {
      output[key] = deepCloneObj(base[key])
    } else {
      output[key] = base[key]
    }
  }
  return output
}

function deepCompare(base, copy) {
  let isEqual = true

  if (typeof base !== typeof copy) {
    return false
  }
  if (typeof copy !== 'object') {
    return base === copy
  }

  // copy 删除了某些key
  for (let key in base) {
    if (!copy.hasOwnProperty(key)) {
      isEqual = false
    }
  }

  // 递归比较是否相等
  for (let key in copy) {
    if (base.hasOwnProperty(key)) {
      if (deepCompare(base[key], copy[key])) {
        copy[key] = base[key];
      } else {
        isEqual = false
      }
    } else {
      isEqual = false
    }
  }

  return isEqual
}

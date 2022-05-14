function deepCopy(obj) {
  if (typeof obj === "object") {
    if (obj.constructor === Array) {
      var newArr = []
      for (var i = 0; i < obj.length; i++) newArr.push(obj[i])
      return newArr
    } else {
      var newObj = {}
      for (var key in obj) {
        newObj[key] = deepCopy(obj[key])
      }
      return newObj
    }
  } else {
    return obj
  }
}

const obj = { a: 1, b: 2, c: { d: 3, e: [1, 2, 3] } }
const clone = deepCopy(obj)

obj.c.e[0] = 100
console.log(clone)


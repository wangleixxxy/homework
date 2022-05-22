/**
 * 实现Array.prototype.map()
 */

Array.prototype.myMap = myMap;

function myMap(callback) {
  // item, index, array
  const res = []
  for (let i = 0; i < this.length; i++) {
    res.push(callback(this[i], i, this))
  }
  return res
}


let arr = [1, 2, 3]
let arr1 = arr.map(item => item * 2)
let arr2 = arr.myMap(item => item * 2)
console.log(arr1, arr2)

// MDN
if (!Array.prototype.map) {
  Array.prototype.map = function (callback, /* thisArg */) {
    var T, A, k; // this对象，结果数组，索引
    // 判断this是否为空，指向数组
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    // 将原数组转换为Object
    var O = Object(this);

    // 无符号右移，取整
    var len = O.length >>> 0;
    // 判断callback是否为函数
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 如果有第二个参数，则将this绑定到第二个参数
    // 否则就是undefined
    if (arguments.length > 1) {
      T = arguments[1];
    }

    // 创建一个空数组
    A = new Array(len);
    k = 0; // 初始化索引

    while (k < len) {
      var kValue, mappedValue;
      // 如果索引合法
      if (k in O) {
        // 获取原数组中的值
        kValue = O[k];
        // 将callback的返回值赋值给mappedValue
        mappedValue = callback.call(T, kValue, k, O);
        // 将mappedValue赋值给A
        A[k] = mappedValue;
      }
      k++;
    }
    return A;
  }
}

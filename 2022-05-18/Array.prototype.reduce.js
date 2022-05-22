/**
 * 实现Array.prototype.reduce
 */
Array.prototype.myReduce = function (callback, initialValue) {
  // 判断调用对象是否为数组
  if (Object.prototype.toString.call(this) !== '[object Array]') {
    throw new TypeError('this is null or not defined');
  }

  const sourceArray = this;
  // 判断数组是否为空
  if (sourceArray.length === 0) {
    throw new TypeError('Reduce of empty array with no initial value');
  }
  // 判断callback是否为函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  let accumulator, currentValue, index;
  // 如果有初始值
  if (initialValue) {
    accumulator = initialValue;
    index = 0;
  } else {
    accumulator = sourceArray[0];
    index = 1;
  }

  // 开始循环
  while (index < sourceArray.length) {
    if (Object.prototype.hasOwnProperty.call(sourceArray, index)) {
      currentValue = sourceArray[index];
      accumulator = callback(accumulator, currentValue, index, sourceArray);
    }
    index++;
  }

  return accumulator;
}

let arr = [1, 2, null, 4, , undefined, 5]
let sum1 = arr.reduce((prev, cur) => {
  return prev + cur
}, '0')
let sum2 = arr.myReduce((prev, cur) => {
  return prev + cur
}, '0')
console.log(sum1, sum2, sum1 === sum2)

/**
2.编程题
// 手写函数柯里化
function curry(func) {
  //此处补全
}
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert(curriedSum(1, 2, 3)); // 6, still callable normally
alert(curriedSum(1)(2, 3)); // 6, currying of 1st arg
alert(curriedSum(1)(2)(3)); // 6, full currying

 */
// function curry(func, arr) {
//   let len = func.length
//   arr = arr || []
//   return function(...args) {
//       let newArgs = arr.concat(args)
//       if (newArgs.length < len) {
//         return curry.call(this, func, newArgs)
//       } else {
//         return func.apply(this, newArgs)
//       }
//   }
// }

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3))
console.log(curriedSum(1)(2, 3))
console.log(curriedSum(1)(2)(3))

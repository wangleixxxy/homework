function myInstanceOf(obj, target) {
  // 直到null为止 或者 obj不是一个object
  if (obj === null || typeof obj !== 'object') {
    return false
  }
  if (!target.prototype) {
    throw new Error('target.property is required')
  }
  let proto = Object.getPrototypeOf(obj)
  if (Object.getPrototypeOf(obj) === target.prototype) {
    return true
  } else {
    // 递归查找
    return myInstanceOf(Object.getPrototypeOf(obj), target)
  }
}


// class Car {
//   constructor() {
//     this.color = 'red'
//   }
// }

// const mycar = new Car()

// console.log(myInstanceOf(mycar, Car))


class A { };
const a = new A();
console.log(myInstanceOf(a, A))

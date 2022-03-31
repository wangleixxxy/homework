/**
 * Object.is
 * https://262.ecma-international.org/6.0/#sec-samevalue
 */
/*
Object.is() 和===基于一致，除了以下情况：

Object.is(0, -0) // false
0 === -0 // true

Object.is(NaN, NaN) // true
NaN === NaN // false
*/

/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function is(a, b) {
  // SameValue algorithm
  if (a === b) { // Steps 1-5, 7-10 // 1,2是否正常返回，3、类型不同返回false 4、类型相同，x为 undefined、null 返回true
    // 同一个String、Boolean、Symbol、Object
    // Steps 6.b-6.e: +0 != -0 // +0 -0 返回false，-0 +0也是返回false，x,y相同数字返回true
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
}
function is2(a, b) {
  if (a !== a) { // NaN不等于自身
    return b !== b; // 如果 b 也是NaN, 也不等于自身，返回true
  }

  if (a === 0 && b === 0) { // -0 === 0 返回true, 当两个参数都为0，1/0是Infinity，1/-0是 -Infinity
    return 1 / a === 1 / b; // Infinity 不等于 -Infinity
  }

  return a === b; // 其他情况使用 === 判断
}

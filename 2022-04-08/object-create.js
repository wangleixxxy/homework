/**
 * 实现 Object.create() 
 */
/**
 * @param {any} proto
 * @return {object}
 */
 function myObjectCreate(proto) {
  if (Object.prototype.toString.call(proto) !== '[object Object]' || proto === null) {
    throw Error('proto')
  }
  function F() {}
  F.prototype = proto
  return new F()
}

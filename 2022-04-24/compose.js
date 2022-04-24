/**
 * compose
 */
function compose() {
  const list = Array.prototype.slice.call(arguments)
  return function (price) {
    while (list.length) {
      const fn = list.pop()
      price = fn(price)
    }
    return price
  }
}
const multiply20 = (price) => price * 20;
const divide100 = (price) => price / 100;
const normalizePrice = (price) => price.toFixed(2);
const discount = compose(normalizePrice, divide100, multiply20);

const res = discount(300.0); //40.00
// console.log('result->', res, 200.0 * 20 / 100);
console.log('result->', res, 300.0 * 20 / 100);

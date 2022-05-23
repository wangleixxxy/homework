/**
 * 实现parseToMoney 
 * 实现千位分隔符
 * 保留三位小数
 */


function parseToMoney(num) {
  if (typeof num !== 'number') {
    return '0';
  }
  let sign = num === Math.abs(num);

  let digits = num.toString().split('.')[0];
  let cents = num.toString().split('.')[1];
  if (!cents) {
    cents = '000';
  }
  let len = digits.length;
  let ans = '';

  for (let i = len - 1; i >= 0; i--) {
    ans = digits[i] + ans;
    // 第一位不需要加逗号
    if (i > 0 && (len - i) % 3 === 0) {
      ans = ',' + ans;
    }
  }
  let res = (((sign) ? '' : '-') + ans + '.' + cents);
  console.log(res);
  return res;
}

parseToMoney(1234.56); // return ‘1,234.56’
parseToMoney(123456789); // return ‘123,456,789’
parseToMoney(1087654.321); // return ‘1,087,654.321’

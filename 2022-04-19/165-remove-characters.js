/**
 * 165.去除字符
 */

function removeChars(input) {
  if (!input) return ''
  let str = ''
  let str2 = ''
  // 清除b
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== 'b') {
      str += input[i]
    }
  }
  // 清除 a c
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === 'a' && str[i + 1] === 'c') {
      str = str.slice(0, i) + str.slice(i + 2)
      i -= 2
    }
  }
  // console.log('111', str)
  return str
}


removeChars('ab') // 'a'
removeChars('abc') // ''
removeChars('cabbaabcca') // 'caa'
removeChars('aaaaccccc') // 'c'

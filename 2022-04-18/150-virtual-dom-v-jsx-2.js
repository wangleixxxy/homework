/**
 * 实现 virtual dom
 */
function parse(code) {
  // 去除空格
  code = code.trim()

  // 第一位不是 < 或者 最后一位不是 >，报错
  if (code[0] !== '<' || code[code.length - 1] !== '>') {
    throw new Error('输入有误')
  }
  // 标签没有闭合
  if (code.split('<').length !== code.split('>').length) {
    throw new Error('没有闭合')
  }

  // 第一位是 < ,从第二位开始
  let i = 1

  // 开始标签
  let [opening, endOpening, isClosing] = parseTag(code, i)
  // 从开始标签的下一位开始
  code = code.substr(endOpening + 1, code.length)
  // 开始标签结束
  i += endOpening

  // 子节点
  const [child, endChild] = parseChild(code, i)
  code = code.substr(endChild, code.length)
  i += endChild

  // 结束标签
  let [closing, endClosing, isClosingEnd] = parseTag(code, i)
  isClosing = isClosingEnd
  code += code.substr(endClosing + 1, code.length)
  i += endClosing

  // 标签未闭合
  if (!isClosing) {
    throw new Error('没有找到闭合标签')
  }
  if (opening !== closing) {
    throw new Error('标签未闭合')
  }

  const res = {
    opening,
    child: [child],
    closing,
    endClosing: i
  }
  return res
}
/**
 * 解析标签
 */
function parseTag(str) {
  let isClosing = false
  // 第一个 >
  let closeOpening = str.indexOf('>')
  let tag = str.slice(1, closeOpening).trim()

  // 闭合标签
  if (tag[0] === '/') {
    isClosing = true
    // 截取 !!!从1开始截取
    tag = tag.slice(1).trim()
  }

  return [tag, closeOpening, isClosing]
}

// 解析中间内容
function parseChild(str) {
  let child = []
  let text = ''
  let i = 0 // 需要使用 i 赋值，不能写在for循环中
  // 遍历子元素 内容
  for (; i < str.length; i++) {
    // close标签闭合了
    if (str[i] === '<' && checkForClosing(str, i)) {
      break
    }
    // 标签开始 嵌套标签
    if (str[i] === '<') {
      let newStr = str.slice(i)
      const result = parse(newStr)
      child.push(text)
      child.push(result)

      // 解析完嵌套的标签 更新i和text
      i += result.endClosing
      text = ''
      continue
    } else {
      // 普通文本内容部分
      text += str[i]
    }
  }

  child.push(text)
  const nextTag = i
  // str没有内容
  if (nextTag === 0) {
    return [null, nextTag]
  }
  return [child, nextTag]
}

// 判断是否是闭合标签
function checkForClosing(str, i) {
  // 结束标签的标志
  if (str[i] === '/') return true
  if (str[i] === '>') return false
  return checkForClosing(str, i + 1)
}

/**
 * @param {any} your AST
 * @returns {string} 
 */
function generate(ast) {
  // 子节点为空
  if (ast.child[0] === null) {
    return h(`${ast.opening}`, null)
  } else {
    // 子节点不为空
    let children = ast.child[0]
    let newChildren = []
    // 遍历子元素
    for (let i = 0; i < children.length; i++) {
      if (children[i] instanceof Object) {
        newChildren.push(generate(children[i]))
      } else {
        // 子元素不为空
        if (children[i] !== '') {
          newChildren.push(children[i])
        }
      }
    }

    // 标签名，函数组件标签和普通标签
    let opening
    if (`${ast.opening}`[0] === `${ast.opening}`[0].toUpperCase()) {
      opening = Heading
    } else {
      opening = `${ast.opening}`
    }

    return h(opening, null, ...newChildren)
  }
}

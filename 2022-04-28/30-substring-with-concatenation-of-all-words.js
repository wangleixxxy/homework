/**
 * 30. 串联所有单词的子串
 * https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words/
 */
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  let wordsNum = words.length
  let wordLen = words[0].length
  const allWords = new Map()
  let res = []
  for (let w of words) {
    allWords.set(w, (allWords.get(w) || 0) + 1)
  }

  // 滑动窗口
  for (let i = 0; i < s.length - wordLen * wordsNum + 1; i++) {
    let sub = new Map()
    let index = i
    while (index < i + wordLen * wordsNum) {
      let curWord = s.substr(index, wordLen)
      // 单词不合法 或者 在未添加 curWord 之前数量就已经够了
      if (!allWords.has(curWord) || allWords.get(curWord) === sub.get(curWord)) {
        break
      }
      sub.set(curWord, (sub.get(curWord) || 0) + 1)
      index += wordLen
    }
    if (index === i + wordsNum * wordLen) {
      res.push(i)
    }
  }
  return res
};
// 时间N^2 空间N

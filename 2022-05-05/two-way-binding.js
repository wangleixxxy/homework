/**
   * 154. 简单实现双向绑定Two-way binding
   * https://bigfrontend.dev/zh/problem/two-way-binding
   */
/**
 * 来简单实现下双向绑定。
 * 请实现函数model(state, element)，使得state.value和HTMLInputElement element联动。
 */
const input = document.createElement('input')
const state = { value: 'BFE' }
model(state, input)

console.log(input.value) // 'BFE'
state.value = 'dev'
console.log(input.value) // 'dev'
input.value = 'BFE.dev'
input.dispatchEvent(new Event('change'))
console.log(state.value) // 'BFE.dev'

/**
 * @param {{value: string}} state
 * @param {HTMLInputElement} element
 */
function model(state, element) {
  element.value = state.value

  element.addEventListener('change', () => {
    state.value = element.value
  })

  Object.defineProperty(state, 'value', {
    set(value) {
      console.log(`set ${value}`)
      element.value = value
    },
    get() {
      console.log(`get`)
      return element.value
    }
  })
}

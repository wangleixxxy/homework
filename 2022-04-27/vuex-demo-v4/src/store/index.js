// import { createStore } from 'vuex'
import { createStore } from './vuex-4.js'

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  count: 0
}


const mutations = {
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  }
}

const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync({ commit }) {
    return new Promise((resolve, reject) => {
      console.log('reject', reject)
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  }
}

const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? '偶数' : '奇数',
}


export default createStore({
  state,
  getters,
  actions,
  mutations
})

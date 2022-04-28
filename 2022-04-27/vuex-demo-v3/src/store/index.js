import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './vuex-3.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state, playload) {
      state.count += playload
    },
    minus(state, playload) {
      state.count -= playload
    }
  },
  actions: {
    increment({ commit }, playload) {
      setTimeout(() => {
        commit('add', playload)
      }, 300)
    }
  },
  getters: {
    count: state => state.count
  }
})

export default store

<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>V3</h1>
    <div id="app">
      <div>state 点击次数: {{ count }},</div>
      <div>getters 奇数/偶数：{{ evenOrOdd }}</div>
      <button @click="increment">加1</button>
      <button @click="decrement">减1</button>
      <button @click="incrementAsync">异步增加</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
// import { useStore } from 'vuex';
import { useStore } from './store/vuex-4.js';

export default {
  name: 'App',
  setup() {
    const store = useStore();
    console.log('store', store);
    return {
      count: computed(() => store.state.count),
      evenOrOdd: computed(() => store.getters.evenOrOdd),
      increment: () => store.commit('increment'),
      decrement: () => store.commit('decrement'),
      incrementAsync: () => store.dispatch('incrementAsync'),
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

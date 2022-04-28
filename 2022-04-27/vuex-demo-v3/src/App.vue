<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <div>
      <button @click="minus">减1</button>
      <br />
      state: {{ $store.state.count }}
      <br />
      getters: {{ $store.getters.count }}
      <br />
      <button @click="add">加1</button>
    </div>
    <div>
      <button @click="increment">dispatch action add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    minus() {
      this.$store.commit('minus', 1);
    },
    add() {
      this.$store.commit('add', 1);
    },
    increment() {
      this.$store.dispatch('increment', 2);
    },
  },
  components: {},
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

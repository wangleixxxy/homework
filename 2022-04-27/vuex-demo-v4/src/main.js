import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js'

const app = createApp(App)

app.use(store)
// console.log('app', app)

app.mount('#app')

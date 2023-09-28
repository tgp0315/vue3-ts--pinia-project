import { createApp } from 'vue'
import store from './store'
import router from './router'
import { initDom } from './utils/positionToCode'
import './style.css'
import App from './App.vue'
initDom()
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

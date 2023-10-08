import { createApp } from 'vue'
import store from './store'
import router from './router'
import ElementPlus from 'element-plus'
import { initDom } from './utils/positionToCode'
import directives from '@/directives/index'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
initDom()
const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(directives)
app.mount('#app')

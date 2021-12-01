import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 重置浏览器默认样式
import 'normalize.css'
// 全局公共样式
import '@/styles/common.less'
createApp(App).use(store).use(router).mount('#app')

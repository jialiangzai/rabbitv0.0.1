import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局注册插件
import Cpplugins from '@/components/index.js'
// 全局指令
import DirePlugins from '@/directives/index'
// 重置浏览器默认样式
import 'normalize.css'
// 全局公共样式
import '@/styles/common.less'
createApp(App).use(store).use(router).use(Cpplugins).use(DirePlugins).mount('#app')

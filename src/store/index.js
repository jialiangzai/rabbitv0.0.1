import { createStore } from 'vuex'
// user模块
import user from './modules/user'
// cart模块
import cart from './modules/cart'
// 创建store实例
export default createStore({
  // 定义变量
  state: {
  },
  // 提供修改state的方法 同步
  mutations: {
  },
  // 获取数据 异步
  actions: {
  },
  // 模块化
  modules: {
    user,
    cart
  }
})

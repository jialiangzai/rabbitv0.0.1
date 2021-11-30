import { createStore } from 'vuex'
// user模块
import user from './modules/user'
// cart模块
import cart from './modules/cart'
// 使用插件做持久化
import createPersistedstate from 'vuex-persistedstate'
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
  },
  // vuex可以接受插件穿装备
  // 直接调用不传参数，键为vuex，传到localstorage中vue3的tools有问题直接去application中看
  // 默认会存所有vuex的所有数据
  plugins: [createPersistedstate({
    key: 'rabbit137', // 指定存储数据的属性名
    // paths: ['user.profile.token']// 指定存什么数据数组形式,元素是字符串,可以是模块名/单个属性支持点的形式
    paths: ['user', 'cart'] // 只有修改state中的数据(mutations)即可触发同步机制，可以看到本地存储数据的的变化
  })]
})

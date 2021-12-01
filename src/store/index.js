// vuex中自带内置的插件
import { createStore, createLogger } from 'vuex'
// user模块
import user from './modules/user'
// cart模块
import cart from './modules/cart'
// 使用第三方插件做持久化省去自己写方法
import createPersistedstate from 'vuex-persistedstate'
// 引入商品分类
import category from './modules/category'
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
    cart,
    category
  },
  // vuex可以接受插件穿装备
  // 直接调用不传参数，键为vuex，传到localstorage中vue3的tools有问题直接去application中看
  // 默认会存所有vuex的所有数据
  plugins: [createPersistedstate({
    key: 'rabbit137', // 指定存储数据的属性名
    // paths: ['user.profile.token']// 指定存什么数据数组形式,元素是字符串,可以是模块名/单个属性支持点的形式
    paths: ['user', 'cart'] // 只有修改state中的数据(mutations)即可触发同步机制，可以看到本地存储数据的的变化
  }),
  // 当前的调试工具对vuex的调试不是很稳定，所以可以借助vuex内置日志插件辅助开发
  // 开启日志 控制台会打印mutation之前的vuex的state和调用的方法及最新的vuex持久化数据
  // 名称  参数  修改前后的state数据
  createLogger()
  ]
})

// 注册全局组件
// vue3方式
import Skeleton from './Skeleton'
export default {
  // vue2参数是构造函数，vue3是vue实例(app)
  install (app) {
    // console.log('Vue实例', app)
    app.component('Skeleton', Skeleton)
  }
}

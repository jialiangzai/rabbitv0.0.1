// 注册全局组件
// vue3方式
// 骨架屏
import Skeleton from './Skeleton'
// 轮播图
import Slider from './Slider'
// 放置到数组中循环遍历
const cps = [Skeleton, Slider]
export default {
  // vue2参数是构造函数，vue3是vue实例(app)
  install (app) {
    // console.log('Vue实例', app)
    cps.forEach(cp => {
      app.component(cp.name, cp)
    })
  }
}
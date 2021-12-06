// 注册全局组件
// vue3方式
// 骨架屏
import Skeleton from './Skeleton'
// 轮播图
import Slider from './Slider'
// 更多
import XtxMore from './More'
// 面包屑组件
import Bread from './Bread'
import BreadItem from './Bread/item.vue'
// 商品信息右侧级联城市选择
import City from './City'
// sku
import Sku from './Sku'
// 数量组件+ -
import Numbox from './Numbox'
// 登录按钮
import BUtton from './Button'
// 放置到数组中循环遍历
const cps = [Skeleton, Slider, XtxMore, Bread, BreadItem, City, Sku, Numbox, BUtton]
export default {
  // vue2参数是构造函数，vue3是vue实例(app)
  install (app) {
    // console.log('Vue实例', app)
    cps.forEach(cp => {
      app.component(cp.name, cp)
    })
  }
}

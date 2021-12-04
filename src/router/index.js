import { createRouter, createWebHashHistory } from 'vue-router'
// 按需加载
// 公共布局
const Layout = () => import('@/views/Layout')
// 首页
const Home = () => import('@/views/Home')
// 详情页
const Detail = () => import('@/views/Goods')
// 路由规则
const routes = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      component: Home
    },
    // 商品详情
    {
      path: '/goods/:id',
      component: Detail
    }
    ]
  }
]

const router = createRouter({
  // 每次路由跳转重置滚动条位置
  // vue2中使用scrollbehavior返回值{x:0,y:0} vue3中返回值是{ left: 0, top: 0 }
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHashHistory(),
  routes
})

export default router

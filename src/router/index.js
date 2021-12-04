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
  history: createWebHashHistory(),
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
// 按需加载
// 公共布局
const Layout = () => import('@/views/Layout')
// 首页
const Home = () => import('@/views/Home')
// 路由规则
const routes = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      component: Home
    }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

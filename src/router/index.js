import { createRouter, createWebHashHistory } from 'vue-router'
// 按需加载
// 公共布局
const Layout = () => import('@/views/Layout')
// 首页
const Home = () => import('@/views/Home')
// 详情页
const Detail = () => import('@/views/Goods')
// 登录
const Login = () => import('@/views/Login')
// 购物车
const Cart = () => import('@/views/Cart')
// 订单列表
const Member = () => import('@/views/Member/order/index.vue')
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
    },
    // 购物车
    {
      path: '/cart',
      component: Cart
    },
    // 订单列表
    {
      path: '/member/order',
      component: Member
    }
    ]
  },
  // 登录路由
  {
    path: '/login',
    component: Login
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

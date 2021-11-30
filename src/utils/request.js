import axios from 'axios'
// store
import store from '@/store'
// router
import router from '@/router'
// baseURL 超时时间配置
const instance = axios.create({
  // baseURL
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net'
  // timeout: 5000
})

// 全局注入token
// 请求拦截器==》发送请求
instance.interceptors.request.use(config => {
  // 在请求头中统一添加token
  const { token } = store.user.state.profile
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// 处理返回数据 token失效跳回到登录页
// 响应拦截器==》成功请求此时页面还没拿到数据
instance.interceptors.response.use(
  (response) => {
    // 简化响应数据到页面
    return response.data
  },
  (error) => {
    // 401 token失效
    if (error.response && error?.response.status === 401) {
      // 被动的 需要带当前401页面地址登录后继续浏览====因为路由可能携带参数用fullPath全地址
      // 这里注意获取401页面路由地址在vue3中发生变化是ref对象要.value
      // encodeURIComponent 转换uri编码，防止解析地址出问题

      const redirectUrl = encodeURIComponent(router.currentRoute.value.fullPath)
      // 因为是被动跳转用replace不用push
      router.replace(`/login?redirectUrl=${redirectUrl}`)
    }
    return Promise.reject(error)
  }
)

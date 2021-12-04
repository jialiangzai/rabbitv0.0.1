
// 监听图片进入可视区实现图片的懒加载
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
// 加载失败显示默认gif
import defaultImg from '@/assets/images/load.gif'
// 注册全局指令
export default {
  // app根实例
  install (app) {
    // console.log('全局指令', app)
    // vue2注册组件在inserted vue3注册在mounted中
    app.directive('imglazy', {
      // 提高性能减轻服务器压力
      // el绑定指令的dom元素 binding用的动态传参获取.value
      /**
       *
       * @param {*} el  img图片标签元素
       * @param {*} binding
       */
      mounted (el, binding) {
        // console.log(el, binding)
        const targetIsVisible = ref(false)
        const { stop } = useIntersectionObserver(el,
          // [{isIntersecting:布尔值}]  observerElement 被观察的dom在这没用到
          ([{ isIntersecting }]) => {
            targetIsVisible.value = isIntersecting
            // console.log('图片是否进入视口', targetIsVisible.value)
            if (isIntersecting) {
              // 进入视口
              // 可以加一个loading效果
              el.src = defaultImg
              // 加载图片----测试可以加延时器但是实际开发不能延时 去network中img
              setTimeout(() => {
                el.src = binding.value
              }, 2000)
              // 如果图片懒加载失败执行默认图片
              el.onerror = () => {
                el.src = defaultImg
              }
              // 发送请求----因为做抽离调的方法不同以参数的形式
              // apiFn()
              // 停止监听图片元素
              stop()
            }
          },
          // 进入当前元素可视区域的比例是多少才执行回调 0-1 值越大 代表需要进入的面积越大
          { threshold: 0 }
        )
      }
    })
  }
}

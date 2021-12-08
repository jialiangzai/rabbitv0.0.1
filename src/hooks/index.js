
import { ref, onUnmounted, computed } from 'vue'
// 检测组件进入可视化视口才去发送请求
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'

import dayjs from 'dayjs'

// 封装监听目标元素进入视口的通用逻辑---->组件懒加载
export function useObserver (apiFn) {
  /**
     * 步骤：
     * 1. 通过ref获取要监控的元素或组件
     * 2. 调用useIntersectionObserver(要监控的元素DOM对象或组件实例, 监控的回调函数)=》多次触发
     *    说明：监控函数执行完，可以解构出stop方法=》停止监控
     */
  const target = ref(null)
  // 此时检测的元素是否进入视口
  const targetIsVisible = ref(false)
  // stop 一个可执行的函数用来停止监听行为对于目标target是否进入视口区域的监听会一直进行不会只监听一次
  // -----防止重复发送请求
  // target   dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
  // 一个由ref api调用之后形成的RefImpl对象 也可以是一个dom对象
  // isIntersecting 一个类型为布尔值的数据 当被监听元素进入视口区域时为true,离开视口区域时为false
  const { stop } = useIntersectionObserver(target,
    // [{isIntersecting:布尔值}]  observerElement 被观察的dom在这没用到
    ([{ isIntersecting }]) => {
      targetIsVisible.value = isIntersecting
      // console.log('组件是否进入视口', targetIsVisible.value)
      if (isIntersecting) {
        // 进入视口
        // 发送请求----因为做抽离调的方法不同以参数的形式
        apiFn()
        // 停止监听元素
        stop()
      }
    },
    // 进入当前元素可视区域的比例是多少才执行回调 0-1 值越大 代表需要进入的面积越大
    { threshold: 0 }
  )
  // 注意一定要返回target否则拿不到ref对象且模板无法使用
  return { target, targetIsVisible }
}

// 倒计时
/**
 *
 * @param {*} time 倒计时的时间秒
 *  自身秒数 开始倒计时 暂停倒计时 倒计时开始后展示的文本
  return { countTime, start, pause, countTimeText }
 */
export function useCountDown (time) {
  const countTime = ref(0)

  // 计算属性基于现在的countTime做一个转换处理
  const countTimeText = computed(() => {
    // 完成转换逻辑
    return dayjs.unix(countTime.value).format('mm分ss秒')
  })

  const { pause, resume } = useIntervalFn(() => {
    /* your function */
    // 自减逻辑
    countTime.value--
    // 到零停止
    if (countTime.value <= 0) {
      pause()
    }
  }, 1000, { immediate: false })

  // 开始计时方法
  function start (tm) {
    if (countTime.value === 0) {
      countTime.value = time || tm
    }
    resume()
  }

  // 清理一下定时器
  // 组件的卸载之后
  onUnmounted(() => {
    pause()
  })

  // console.log(pause, resume, isActive)
  // 自身秒数 开始倒计时 暂停倒计时 倒计时开始后展示的文本
  return { countTime, start, pause, countTimeText }
}

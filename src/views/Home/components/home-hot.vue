<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过" ref="target">
    <ul class="goods-list">
      <li v-for="item in goods" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
    <template #right>
      <xtx-more></xtx-more>
    </template>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import { findHot } from '@/api/home'
import { ref } from 'vue'
// 检测组件进入可视化视口才去发送请求
import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'HomeHot',
  components: { HomePanel },
  // data () {
  //   return {
  //     goods: []
  //   }
  // },
  // async created () {
  //   const data = await findHot()
  //   this.goods = data.result
  // }
  setup () {
    const goods = ref([])
    const getGoods = async () => {
      const { result } = await findHot()
      // console.log('人气推荐', result)
      goods.value = result
    }
    // getGoods()
    // 检测
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
        console.log('组件是否进入视口', targetIsVisible.value)
        if (isIntersecting) {
          // 进入视口
          // 发送请求
          getGoods()
          // 停止监听元素
          stop()
        }
      }
    )
    // console.log('1', res)
    return { goods, getGoods, targetIsVisible, target }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    // 激活效果
    transition: all 0.5s;
    &:hover {
      transform: translate3d(0, -6px, 0);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    }
    // end
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>

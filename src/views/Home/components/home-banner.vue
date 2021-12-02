<template>
  <div class="home-banner">
    <XtxSlider :data="list" autoPlay />
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { ref, onMounted } from 'vue'
// 逻辑抽离--->缓解setup变种写法
const useXtxSlider = () => {
  const list = ref([])
  const getList = async () => {
    const { result } = await findBanner()
    console.log('轮播图数据', result)
    list.value = result
  }
  onMounted(() => {
    getList()
  })
  return { list }
}
export default {
  name: 'HomeBanner',
  /**
   * 1.定义轮播图列表变量
   * 2.定义获取轮播图方法
   * 3.在组件挂载发送求
   */
  setup () {
    // const list = ref([])
    // const getList = async () => {
    //   const { result } = await findBanner()
    //   console.log('轮播图数据', result)
    //   list.value = result
    // }
    // onMounted(() => {
    //   getList()
    // })
    const { list } = useXtxSlider()
    return { list }
  }
}
</script>

<style scoped lang='less'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>

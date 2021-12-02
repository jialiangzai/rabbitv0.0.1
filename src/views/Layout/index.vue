<template>
  <!-- <nav>顶部通栏</nav> -->
  <!-- <TopNav /> -->
  <xtx-top-nav />
  <!-- <header>头部</header> -->
  <XtxHeader />
  <!-- 吸顶组件 -->
  <XtxHeaderSticky />
  <main>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </main>
  <!-- <footer>底部</footer> -->
  <XtxFooter />
</template>

<script>
import XtxTopNav from './components/topnav.vue'
import XtxHeader from './components/header.vue'
import XtxFooter from './components/footer.vue'
// 吸顶
import XtxHeaderSticky from './components/header-sticky.vue'
// 因为组件复用了，只要复用会重新发送请求，只需找到公共的父组件去发一次请求共享就可以(子组件有计算属性)
import { useStore } from 'vuex'
export default {
  name: 'xtx-layout',
  components: { XtxTopNav, XtxHeader, XtxFooter, XtxHeaderSticky },
  setup () {
    const store = useStore()
    // 当然可以在onMounted发请求但是这里比较快
    store.dispatch('category/getCategory')
  }
}
</script>

<style scoped lang='less'></style>

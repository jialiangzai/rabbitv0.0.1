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
export default {
  name: 'xtx-layout',
  components: { XtxTopNav, XtxHeader, XtxFooter, XtxHeaderSticky }
}
</script>

<style scoped lang='less'></style>

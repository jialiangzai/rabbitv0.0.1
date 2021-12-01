<template>
  <!-- <nav>顶部通栏</nav> -->
  <!-- <TopNav /> -->
  <xtx-top-nav />
  <!-- <header>头部</header> -->
  <XtxHeader />
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
export default {
  name: 'xtx-layout',
  components: { XtxTopNav, XtxHeader, XtxFooter }
}
</script>

<style scoped lang='less'></style>

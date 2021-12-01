<template>
  <div class="container">
    <!-- 左侧分类列表 -->
    <HomeCategory />
    <!-- 右侧轮播图 -->
    <HomeBanner />
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
export default {
  components: {
    HomeCategory, HomeBanner
  },
  setup () {
    return {}
  }
}
</script>

<style lang="less" scoped>
// 手动引入less变量样式
// @import "~@/styles/variables.less";
// .box {
//   color: @xtxColor;
// }
</style>

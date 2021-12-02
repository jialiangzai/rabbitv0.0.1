<template>
  <div class="container">
    <!-- 左侧分类列表 -->
    <HomeCategory />
    <!-- 右侧轮播图 -->
    <HomeBanner />
    <!-- 测试商品电梯导航 -->
    <!-- <HomePanel title="主标题" subTitle="副标题"> -->
    <!-- <template #right> </template> -->
    <!-- 在模板上使用插槽和vue2类似 -->
    <!-- <h2>我是内容</h2> -->
    <!-- </HomePanel> -->
    <!-- 商品电梯导航 -->
    <HomeNew />
    <!-- 人气推荐 -->
    <HomeHot />
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
// import HomePanel from './components/home-panel.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
export default {
  components: {
    HomeCategory, HomeBanner, HomeNew, HomeHot
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

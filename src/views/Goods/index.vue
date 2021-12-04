<template>
  <div class="xtx-goods-page" v-if="listDetails && listDetails.categories">
    <div class="container">
      <!-- 面包屑 加载完成listDetails再显示所有内容-->
      <XtxBread separator="/">
        <!-- 默认插槽 -->
        <!-- 注意首页是固定的 -->
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <!-- 一级分类 -->
        <XtxBreadItem to="/">{{ listDetails.categories[1].name }}</XtxBreadItem>
        <!-- 二级分类 -->
        <XtxBreadItem to="/">{{ listDetails.categories[0].name }}</XtxBreadItem>
        <!-- 商品详情 -->
        <XtxBreadItem to="/">{{ listDetails.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 新增结构 -->
        <!-- 图片预览区 -->
        <div class="media">
          <GoodsImage :mainPictures="listDetails.mainPictures" />
        </div>
        <!-- 商品信息区 -->
        <div class="spec"></div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { findGoods } from '@/api/goods'
import { useRoute } from 'vue-router'
// 图片预览
import GoodsImage from './components/goods-image.vue'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsImage
  },
  setup () {
    const listDetails = ref({})
    // 路由参数对象是一个reactive对象响应式的
    const route = useRoute()
    const getListDetail = async () => {
      const { result } = await findGoods(route.params.id)
      console.log('商品详情', result)
      listDetails.value = result
    }
    getListDetail()
    return { listDetails, getListDetail }
  }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  // 新增样式
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
    background: #fff;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>

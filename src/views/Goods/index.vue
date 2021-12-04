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
          <GoodsSales />
        </div>
        <!-- 商品信息区 -->
        <div class="spec">
          <GoodsName />
        </div>
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
// 依赖注入
import { ref, provide } from 'vue'
import { findGoods } from '@/api/goods'
import { useRoute } from 'vue-router'
// 图片预览
import GoodsImage from './components/goods-image.vue'
// 左侧底部信息
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsImage,
    GoodsSales,
    GoodsName
  },
  setup () {
    const listDetails = ref({})
    // 依赖数据谁用谁注入
    // 只能写第一层和setup的底层钩子函数执行有关-----可以获取到   listDetails是响应式的
    provide('goods', listDetails)
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

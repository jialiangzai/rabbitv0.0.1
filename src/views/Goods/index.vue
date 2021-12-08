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
          <!-- sku组件 -->

          <!-- 产出当前选择的商品规格信息，如果是完整的sku，产出完整的对象信息，如果不完整，则产出空对象 -->
          <GoodsSku :goods="listDetails" @change="selSku" />
          <!-- 数量组件 -->
          <XtxNumbox
            :max="listDetails.inventory"
            :min="1"
            v-model="modelValues"
          />
          <!-- 底层关于.sync被合并到了v-model vue3可以绑定多个v-model但是要有各自名字 v-model:自己起的名字默认值是modelValue ；emits:['update:自定义的名字']-->
          <!-- <XtxNumbox
            :max="listDetails.inventory"
            :min="1"
            :modelValue="modelValue"
            @update:modelValue="modelValue = $event"
          /> -->
          <!-- 按钮组件加入购物车 默认插槽动态去结构-->
          <XtxButton size="large" type="red" @click="addCart">
            加入购物车
          </XtxButton>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <img
              v-for="(url, i) in listDetails.details.pictures"
              :key="i"
              v-imglazy="url"
              alt=""
            />
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 依赖注入
import { ref, provide, reactive } from 'vue'
import { findGoods } from '@/api/goods'
import { useRoute } from 'vue-router'
// 图片预览
import GoodsImage from './components/goods-image.vue'
// 左侧底部信息
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import msg from '@/components/Message'
import { useStore } from 'vuex'
// 获取详情数据
const useDetailData = () => {
  // 数量
  const modelValues = ref(1)
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
  return { listDetails, modelValues }
}
// 存储有效的sku信息
const useSkusel = (listDetails) => {
  // 存储有效的sku信息
  const currSel = ref(null)
  // sku选择事件
  const selSku = (sku) => {
    console.log('选中的sku信息', sku)
    // 判断是否有效 =====id
    if (sku.skuId) {
      // 修改商品的现价原价库存信息
      listDetails.value.price = sku.price
      listDetails.value.oldPrice = sku.oldPrice
      listDetails.value.inventory = sku.inventory
      // 有效的sku
      currSel.value = sku
    } else {
      // 无效的sku对象 清除上次选择----注意这里必须是null如果是一个空对象{}表示true
      currSel.value = null
    }
  }
  return { selSku, currSel }
}
// 加入购物车
const useAddCart = (listDetails, currSel, modelValues) => {
  const store = useStore()
  // 加入购物车
  const addCart = async () => {
    /**
       * 需要满足的条件：
       * 1.完整有效的sku (选择商品的sku属性==》产生sku有效信息)
       * 2.有效sku商品数据库存不能为0
       */
    if (!currSel.value) {
      return msg({ type: 'warn', text: '请选择完整的sku信息', time: 2000 })
    }
    if (currSel.value.inventory === 0) {
      return msg({ type: 'warn', text: '亲，你的宝贝买完了', time: 2000 })
    }

    // 购物车数据与后台接口一致
    const carts = reactive({
      id: listDetails.value.id,
      name: listDetails.value.name,
      picture: listDetails.value.mainPictures[0],
      // sku属性ID（唯一）
      skuId: currSel.value.skuId,
      // 价格
      price: currSel.value.oldPrice,
      nowPrice: currSel.value.price,
      attrsText: currSel.value.specsText,
      // 库存
      stock: currSel.value.inventory,
      // 是否在购物车选中
      selected: true,
      // 是否是有效商品
      isEffective: true,
      // 购买数量
      count: modelValues.value
    })
    console.log('秒了', carts)
    try {
      // 调用vuex的actions方法区分是否是登录状态
      const res = await store.dispatch('cart/addCartActions', carts)
      // 当actions中无返回值的时候await拿到的是undefined，如果有返回值拿到的就是返回值此时是 加入购物车成功
      console.log('我是加入的回调promise', res)
      msg({ type: 'success', text: res, time: 2000 })
    } catch (error) {
    }
  }
  return {
    addCart
  }
}
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsImage,
    GoodsSales,
    GoodsName
  },
  setup () {
    // 抽离 获取数据 sku选中规格  购物车
    const { listDetails, modelValues } = useDetailData()
    const { selSku, currSel } = useSkusel(listDetails)
    const { addCart } = useAddCart(listDetails, currSel, modelValues)
    return { listDetails, modelValues, addCart, currSel, msg, selSku }
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
  img {
    // 撑满
    width: 100%;
  }
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>

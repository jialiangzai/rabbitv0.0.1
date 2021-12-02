<template>
  <!-- 骨架屏 -->
  <Skeleton />
  <div class="home-category">
    <ul class="menu">
      <!-- 一级 -->
      <li
        v-for="item in leftNavs"
        :key="item.id"
        @mouseenter="currCateId = item.id"
      >
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <!-- 二级 -->
        <template v-if="item.children">
          <RouterLink v-for="sub in item.children" :key="sub.id" to="/">
            {{ sub.name }}
          </RouterLink>
        </template>
      </li>
    </ul>
    <!-- 鼠标激活弹层显示 -->
    <!-- 弹层 -->
    <div class="layer">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <!-- 做判断 -->
      <ul v-if="currGoods && currGoods.goods">
        <li v-for="i in currGoods.goods" :key="i.id">
          <RouterLink to="/">
            <img :src="i.picture" :alt="i.name" />
            <div class="info">
              <p class="name ellipsis-2">{{ i.name }}</p>
              <p class="desc ellipsis">{{ i.desc }}</p>
              <p class="price"><i>¥</i>{{ i.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 从vuex中取数据因为在header中已经发请求只需从vuex中取
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
export default {
  name: 'HomeCategory',
  setup () {
    // 拿到实例
    const store = useStore()
    // store.state.category.catelist
    // 因为二级内容需要处理只取前两个通过计算属性
    const leftNavs = computed(() => {
      return store.state.category.catelist.map(item => {
        return {
          id: item.id,
          name: item.name,
          // slice(开始的索引，结束的索引)不包含结束的索引左闭右开----不会改变原数组截取新的元素返回新数组
          // splice(开始的索引，删除的长度，要新增的不包含之前的位置)----改变了原数组
          children: item.children.slice(0, 2)
        }
      })
    })
    // 鼠标经过左侧的分类，右侧弹层显示对应的分类的商品
    /**
     * 注册鼠标经过事件=》获取当前分类下的推荐商品（item.goods）
     * 拿到id
     * 获取当前分类的item.goods
     * 渲染弹层数据
     */
    const currCateId = ref('')
    const currGoods = computed(() => {
      //  store.state.category.catelist.find(item => item.id === currCateId.value)找到leftNavs对应的数据项是对象
      // 这里报错是因为页面加载第一次异步请求还没响应到页面
      return store.state.category.catelist.find(item => item.id === currCateId.value)
      // return store.state.category.catelist.find(item => item.id === currCateId.value)?.goods
    })
    return { leftNavs, currCateId, currGoods }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  // 弹层默认不显示
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            overflow: hidden;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  // 显示弹层
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>

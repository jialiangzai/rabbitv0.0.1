<template>
  <div class="goods-image">
    <!-- 左侧大图 -->
    <div class="middle">
      <img :src="mainPictures[currentIndex]" alt="" />
    </div>
    <!--右侧 小图列表 -->
    <ul class="small">
      <li
        v-for="(img, i) in mainPictures"
        :key="i"
        @mouseenter="currentIndex = i"
      >
        <img :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'GoodsImage',
  props: {
    mainPictures: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const currentIndex = ref(0)
    return { currentIndex }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>

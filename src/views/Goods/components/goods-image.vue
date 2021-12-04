<template>
  <p>x{{ elementX }}, y{{ elementY }}, 是否在盒子外面{{ isOutside }}</p>
  <div class="goods-image">
    <!-- 放大镜的盒子 -->
    <div
      class="large"
      :style="[{ backgroundImage: `url(${mainPictures[currentIndex]})` }]"
    ></div>
    <!-- 左侧大图 -->
    <div class="middle" ref="leftImg">
      <img :src="mainPictures[currentIndex]" alt="" />
      <!-- 蒙层容器 -->
      <div class="layer"></div>
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
import { useMouseInElement } from '@vueuse/core'
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
    // ref对象
    const leftImg = ref(null)
    // elementX 鼠标基于容器左上角X轴偏移
    // elementY 鼠标基于容器左上角Y轴偏移
    // isOutside 鼠标是否在模板容器外
    // 三个参数都是ref对象
    const { elementX, elementY, isOutside } = useMouseInElement(leftImg)

    return { currentIndex, leftImg, elementX, elementY, isOutside }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  // 放大镜弹层
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
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

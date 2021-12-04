<template>
  <!-- <p>x{{ elementX }}, y{{ elementY }}, 是否在盒子外面{{ isOutside }}</p> -->
  <div class="goods-image">
    <!-- 放大镜的盒子 -->
    <div
      v-show="!isOutside"
      class="large"
      :style="[
        {
          backgroundImage: `url(${mainPictures[currentIndex]})`,
          backgroundPosition: `${bg.x}px  ${bg.y}px`,
        },
      ]"
    ></div>
    <!-- 左侧大图 -->
    <div class="middle" ref="leftImg">
      <img :src="mainPictures[currentIndex]" alt="" />
      <!-- 蒙层容器 -->
      <div
        v-show="!isOutside"
        class="layer"
        :style="{ left: `${pos.left}px`, top: `${pos.top}px` }"
      ></div>
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
import { ref, watch } from 'vue'
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
    // 返回的三个参数都是ref对象
    // useMouseInElement函数调用的参数-------规定鼠标移动范围(Dom元素)
    const { elementX, elementY, isOutside } = useMouseInElement(leftImg)
    /**
   * 1. 蒙层的移动
   *    获取元素内鼠标的移动坐标
   *    监听元素内鼠标移动的坐标变化===》控制蒙层的移动====》计算top/left   使用watch
   *    注意使用蒙层移动最终以它的中心点为基准位置而不是鼠标在蒙层左上角
   * 结论：
   * 蒙层可以移动范围 100-300 存在超出
   * 蒙层位置 left | top= elementX, elementY - 蒙层的width| height 的1/2
   * 蒙层的可移动距离 0 -200限制超出
   * left = 滑块中心点距离左侧距离 - 蒙层滑块宽度一半
   * top = 滑块中心点距离顶部距离 - 蒙层滑块宽度一半
   */
    // 定义蒙层的位置
    const pos = ref({ left: 0, top: 0 })
    // 定义放大镜的位置是小盒子图片的两倍像素
    const bg = ref({ x: 0, y: 0 })
    watch([elementX, elementY], () => {
      // x轴
      if (elementX.value < 100) {
        pos.value.left = 0
      } else if (elementX.value > 300) {
        pos.value.left = 200
      } else {
        // 减去蒙层的一半100
        pos.value.left = elementX.value - 100
      }
      // y轴
      if (elementY.value < 100) {
        pos.value.top = 0
      } else if (elementY.value > 300) {
        pos.value.top = 200
      } else {
        // 减去蒙层的一半100
        pos.value.top = elementY.value - 100
      }
      // 1. 大图和小图比例为2: 1
      // 2. 所以计算公式应该为小图的定位距离乘以2，大图背景的移动始终是跟着滑块的移动走的
      // 因为浏览器默认的坐标系是左上角 图片默认位置也是左上角所以为负数
      bg.value.x = -pos.value.left * 2
      bg.value.y = -pos.value.top * 2
    })
    return { currentIndex, leftImg, elementX, elementY, isOutside, pos, bg }
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

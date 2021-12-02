<template>
  <!-- <div class="app-header-sticky" :class="{ show: isShow }"> -->
  <div class="app-header-sticky" :class="{ show: y > 100 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 复用了header-nav组件会发两次请求 -->
      <HeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from './header-nav'
// import { ref, onMounted } from 'vue'
// 依赖vueuse插件的useWindowScroll钩子实现
import { useWindowScroll } from '@vueuse/core'
export default {
  name: 'AppHeaderSticky',
  components: { HeaderNav },
  // data () {
  //   return {
  //     isShow: false
  //   }
  // },
  // 原生js
  // created () {
  //   window.onscroll = () => {
  //     // 滚动高度
  //     const hights = document.documentElement.scrollTop
  //     if (hights > 100) {
  //       this.isShow = true
  //     } else {
  //       this.isShow = false
  //     }
  //   }
  // },
  setup () {
    // 定义一个变量存储是否可见吸顶组件
    // 默认不显示
    // const isShow = ref(false)
    // 实现滚动事件显示吸顶组件  -----
    // 实际就是window的滚动事件拿到滚动高度当满足条件是就去控制
    // onMounted(() => {
    // window.onscroll = () => {
    //   // 滚动高度
    //   const hights = document.documentElement.scrollTop
    //   // console.log('页面的滚动高度', hights)
    //   if (hights > 100) {
    //     isShow.value = true
    //   } else {
    //     isShow.value = false
    //   }
    // }
    // })
    const { y } = useWindowScroll()
    // return { isShow }
    return { y }
  }
}
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // ======== 此处为新增样式！！！！！！======
  // 默认情况下完全把自己移动到上面=> 不显示
  // 过渡下拉效果
  transform: translateY(-100%);
  // 完全透明
  opacity: 0;
  // 显示出来的类名
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  // end
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url("~@/assets/images/logo.png") no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>

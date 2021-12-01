<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <!-- 延时用骨架屏 -->
    <li v-for="v in catelist" :key="v.id" v-cloak>
      <!-- 一级菜单 -->
      <a href="#">{{ v.name }}</a>
      <!-- hover 显示 start -->
      <template class="layer">
        <ul>
          <!-- 二级菜单 -->
          <li v-for="chd in v.children" :key="chd.id">
            <a href="#">
              <img :src="chd.picture" alt="" />
              <p>{{ chd.name }}</p>
            </a>
          </li>
        </ul>
      </template>
      <!-- hover 显示 end -->
    </li>
    <!-- <li><a href="#">餐厨</a></li>
    <li><a href="#">艺术</a></li>
    <li><a href="#">电器</a></li>
    <li><a href="#">居家</a></li>
    <li><a href="#">洗护</a></li>
    <li><a href="#">孕婴</a></li>
    <li><a href="#">服装</a></li>
    <li><a href="#">杂货</a></li> -->
  </ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppHeaderNav',
  created () {
    this.getCateList()
  },
  computed: {
    ...mapState('category', ['catelist'])
  },
  methods: {
    getCateList () {
      this.$store.dispatch('category/getCategory')
    }
  }
}
</script>

<style scoped lang='less'>
[v-cloak] {
  display: none;
}
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    > a.router-link-exact-active {
      color: @xtxColor;
      border-bottom: 1px solid @xtxColor;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }
    // 初始样式 不显示
    .layer {
      width: 1240px;
      background-color: #fff;
      position: absolute;
      left: -200px;
      top: 56px;
      // 不显示控制高度为0
      height: 0;
      overflow: hidden;
      // 为0不显示
      opacity: 0;
      box-shadow: 0 0 5px #ccc;
      transition: all 0.2s 0.1s;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 70px;
        align-items: center;
        height: 124px;
        li {
          width: 110px;
          text-align: center;
          img {
            width: 60px;
            height: 60px;
          }
          p {
            padding-top: 10px;
          }
          &:hover {
            p {
              color: @xtxColor;
            }
          }
        }
      }
    }
    // hover之后显示出来
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      > .layer {
        //显示的时候给高度
        height: 120px;
        // 为1显示
        opacity: 1;
      }
    }
    // end
  }
}
</style>

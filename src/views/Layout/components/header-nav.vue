<template>
  <ul class="app-header-nav" v-cloak>
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <!-- 延时用骨架屏 -->
    <li v-for="v in catelist" :key="v.id">
      <!-- 一级菜单 -->
      <a href="#">{{ v.name }}</a>
      <!-- hover 显示 start -->
      <div class="layer">
        <ul>
          <!-- 二级菜单 -->
          <li v-for="chd in v.children" :key="chd.id">
            <a href="#">
              <img :src="chd.picture" alt="" />
              <p>{{ chd.name }}</p>
            </a>
          </li>
        </ul>
      </div>
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
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
export default {
  name: 'AppHeaderNav',
  //   1. state中定义我们需要管理的数据  响应式的  由业务决定当前到底应该定义成什么类型
  // 2. mutation中定义修改数据的方法  同步函数  只需要完成实参注入对于state中的数据赋值即可
  // 3. 如果有异步 我们就封装一个action函数 1. 发送请求  2.调用mutation函数(支持异步调用的mutation)
  // 4. 在业务组件里找到一个合适的时机调用action函数

  // 测试:
  //     1. dev- tools  检测当前的action函数和mutation是否调用成功  传递的参数是否符合预期
  // 2. Logger插件  检测log区域查看当前的action函数和mutation是否调用成功  传递的参数是否符合预期
  // vue2开始
  // created () {
  //   this.getCateList()
  // },
  // map目前还是以vue2的计算属性为主
  // computed: {
  //   ...mapState('category', ['catelist'])
  // },
  // methods: {
  //   getCateList () {
  //     this.$store.dispatch('category/getCategory')
  //   }
  // },
  //  vue2结束

  // vue3实现原理
  setup () {
    // 因为没有this所以用useStore钩子(vuex内置的钩子)拿到store实例
    // store实例===this.$store
    // 定义的useStore钩子函数不要写到内部函数中(底层原理)，放在setup的第一层
    const store = useStore()
    // 组件挂载后调用store的dispatch方法
    onMounted(() => {
      // console.log(store)
      store.dispatch('category/getCategory')
    })
    // 使用vue3的计算属性不依赖mapState
    const catelist = computed(() => {
      return store.state.category.catelist
    })
    return { catelist }
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

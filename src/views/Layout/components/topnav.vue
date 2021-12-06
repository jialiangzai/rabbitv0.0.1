<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 登录人信息 -->
        <!-- template不会渲染到页面还能实现条件判断 -->
        <template v-if="profile.token">
          <li>
            <a href="javascript:;"
              ><i class="iconfont icon-user"></i
              >{{ profile.nickname || profile.account }}</a
            >
          </li>
          <li><a href="javascript:;" @click="loaout">退出登录</a></li>
        </template>
        <!-- 未登录 -->
        <template v-else>
          <li><router-link to="/login">请先登录</router-link></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <!-- 其他连接 -->
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { useRouter } from 'vue-router'
import { mapState, useStore } from 'vuex'
export default {
  name: 'AppTopnav',
  // map目前还是用vue2
  computed: {
    // 使用带命名空间模块数据， 第一个参数：模块名称，第二个是需要映射的数据
    ...mapState('user', ['profile'])
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const loaout = () => {
      /**
       * 1. 清除本地用户信息
       * 2. 路由跳转
       *  */
      store.dispatch('user/logout')
      // 主动退出不带参数
      router.replace('/login')
    }

    return {
      loaout
    }
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>

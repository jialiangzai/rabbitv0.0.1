<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 登录人信息 -->
        <!-- template不会渲染到页面还能实现条件判断 -->
        <template v-if="profile.token">
          <li>
            <a href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a>
          </li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>
        <!-- 未登录 -->
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
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
import { mapState } from 'vuex'
export default {
  name: 'AppTopnav',
  // map目前还是用vue2
  computed: {
    // 使用带命名空间模块数据， 第一个参数：模块名称，第二个是需要映射的数据
    ...mapState('user', ['profile'])
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

<template>
  <div class="box">首页</div>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="less" scoped>
// 手动引入less变量样式
@import "~@/styles/variables.less";
.box {
  color: @xtxColor;
}
</style>

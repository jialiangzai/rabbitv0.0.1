
<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <!-- 左侧标题 -->
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
        <!-- 右侧内容区域 具名插槽-->
        <slot name="right" />
      </div>
      <!-- 主体内容区域 默认插槽-->
      <slot />
    </div>
  </div>
</template>

<script>
// 1. 图中标出的四个部分都是可能会发生变化的，需要我们定义为可配置
// 2. 主标题和副标题由于是纯文本，我们定义成props即可
// 3. 右侧内容和主体内容由于可能会传入较为复杂的自定义模板，我们定义成slot利用插槽渲染
export default {
  name: 'HomePanel',
  props: {
    // 主标题
    title: {
      type: String,
      default: ''
    },
    // 副标题
    subTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>

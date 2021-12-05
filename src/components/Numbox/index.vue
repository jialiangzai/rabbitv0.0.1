<template>
  <div class="xtx-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="sub">-</a>
      <input type="text" readonly :value="num" />
      <a href="javascript:;" @click="add">+</a>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'XtxNumbox',
  // 打折活动及库存特殊情况由父组件传入实现复用性最大化
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    }
  },
  setup (props, { commit }) {
    // 数量 默认值是1
    const num = ref(1)
    // 加
    const add = () => {
      if (props.max <= num.value) {
        return
      }
      num.value++
      // 同步父组件 （子 -> 父）
      commit('update:modelValue', num.value)
    }
    // 减
    const sub = () => {
      if (num.value <= props.min) {
        return
      }
      num.value--
    }
    return { num, add, sub }
  }
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>

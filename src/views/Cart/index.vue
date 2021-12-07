<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <!-- <XtxCheckbox v-model="isAll">全选</XtxCheckbox> -->
                <XtxCheckbox :modelValue="isAll" @update:modelValue="setIsAllFn"
                  >全选</XtxCheckbox
                >
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-for="good in validList" :key="good.skuId">
              <td>
                <!--
                有效果,但是不推荐 在严格模式下会报错 必须走mutation函数进行修改才可以
                难点：选择框最新的数据状态拿到 给它修改到vuex中对应的数据项上
                父组件中需要拿到子组件中的状态  子传父   自定义事件 v-model完整写法
                vue2 ===> :value+@input
                vue3 ===> :modelValue + @update:modelValue
               -->
                <!-- <XtxCheckbox v-model="good.selected" /> -->
                <XtxCheckbox
                  :modelValue="good.selected"
                  @update:modelValue="singnChe(good, $event)"
                />
              </td>
              <td>
                <div class="goods">
                  <!-- 注意跳转的是商品的id -->
                  <RouterLink :to="`/goods/${good.id}`"
                    ><img :src="good.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ good.name }}
                    </p>
                    <!-- 选择规格组件 -->
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ good.nowPrice }}</p>
                <p>
                  比加入时降价
                  <span class="red"
                    >&yen;{{ (good.price - good.nowPrice).toFixed(2) }}</span
                  >
                </p>
              </td>
              <td class="tc">
                <!-- <XtxNumbox :isShowCount="false" v-model="good.count" /> -->
                <XtxNumbox
                  :isShowCount="false"
                  :modelValue="good.count"
                  @update:modelValue="changeNum(good, $event)"
                />
              </td>
              <!-- 小计 -->
              <td class="tc">
                <p class="f16 red">
                  &yen;{{ (good.nowPrice * good.count).toFixed(2) }}
                </p>
              </td>
              <td class="tc">
                <p>
                  <a class="green" href="javascript:;" @click="delCheck(good)"
                    >删除</a
                  >
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{ validList.length }} 件商品，已选择
          {{ validSeled.length }} 件，商品合计：
          <!-- 选中的商品总价 -->
          <span class="red">¥{{ validSeledTotal.toFixed(2) }}</span>
        </div>
        <div class="total">
          <XtxButton type="primary">下单结算</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, useStore } from 'vuex'
import msg from '@/components/Message/index'
export default {
  name: 'XtxCartPage',
  computed: {
    ...mapGetters('cart', [
      'validList',
      'validSeled',
      'validSeledTotal',
      'isAll'])
  },
  setup () {
    const store = useStore()
    // 单选
    const singnChe = async (good, isChe) => {
      // console.log(good, isChe)
      // 修改vuex数据正规
      try {
        const res = await store.dispatch('cart/signCheckActions', { good, isChe })
        msg({ type: 'success', text: res })
      } catch (error) {
        msg({ type: 'error', text: '操作失败' })
      }
    }
    // 全选 不穿参数默认就可以拿到子传父的数据所以模板没有写参数
    const setIsAllFn = async (flag) => {
      try {
        const res = await store.dispatch('cart/TotalActions', flag)
        msg({ type: 'success', text: res })
      } catch (error) {
        msg({ type: 'error', text: '操作失败' })
      }
    }
    // 删除
    // 1. 点击删除按钮记录当前点击的商品数据
    // 2. 使用商品数据的skuId在vuex中找到对应项删除（splice）=》调用已有删除action逻辑
    const delCheck = async (good) => {
      try {
        const res = await store.dispatch('cart/delSignActions', good)
        msg({ type: 'success', text: res })
      } catch (error) {
        msg({ type: 'error', text: '操作失败' })
      }
    }
    // 修改数量
    const changeNum = async (good, num) => {
      try {
        await store.dispatch('cart/changeNumActions', { good, num })
      } catch (error) {
        console.dir(error)
      }
    }
    return { singnChe, setIsAllFn, delCheck, changeNum }
  }
}
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>

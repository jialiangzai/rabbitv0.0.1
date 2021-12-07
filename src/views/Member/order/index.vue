<template>
  <div class="xtx-order-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>我的订单</XtxBreadItem>
      </XtxBread>
      <div class="order-list">
        <div class="order-item" v-for="order in list" :key="order.id">
          <div class="head">
            <span>下单时间：{{ order.createTime }}</span>
            <span
              ><router-link :to="`/pay?id=${order.id}`"
                >订单编号：{{ order.id }}</router-link
              ></span
            >

            <span class="down-time" v-if="order.orderState === 1">
              <b>未付款</b>
            </span>
            <span class="down-time" v-if="order.orderState === 2">
              <b>已付款：￥{{ order.payMoney }}</b>
            </span>
            <span class="down-time" v-if="order.orderState === 6">
              <b>已取消</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findOrderList } from '@/api/order'
import { ref, onMounted } from 'vue'

export default {
  setup () {
    const list = ref([])
    const rq = {
      page: 1,
      pageSize: 20,
      orderState: 0
    }
    const getList = async () => {
      const res = await findOrderList(rq)
      console.log(res)
      list.value = res.result.items
    }
    onMounted(() => {
      getList()
    })
    return { list }
  }
}
</script>

<style lang="less" scoped>
.order-list {
  padding: 20px;
  background: #fff;
  .order-item {
    margin-bottom: 20px;
    border: 1px solid #f5f5f5;
    .head {
      height: 50px;
      line-height: 50px;
      background: #f5f5f5;
      padding: 0 20px;
      overflow: hidden;
      span {
        margin-right: 20px;
        &.down-time {
          margin-right: 0;
          float: right;
          i {
            vertical-align: middle;
            margin-right: 3px;
          }
          b {
            vertical-align: middle;
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>

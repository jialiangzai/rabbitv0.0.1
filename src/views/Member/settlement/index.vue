<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>填写订单</XtxBreadItem>
      </XtxBread>
      <div class="wrapper" v-if="checkoutInfo">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <!-- 地址 有地址不显示提醒无地址显示 -->
              <div class="none" v-if="!curAddress">
                您需要先添加收货地址才可提交订单。
              </div>
              <ul v-if="curAddress">
                <li>
                  <span>收<i />货<i />人：</span>{{ curAddress.receiver }}
                </li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li>
                  <span>收货地址：</span
                  >{{ curAddress.fullLocation + curAddress.address }}
                </li>
              </ul>
            </div>
            <div class="action">
              <XtxButton class="btn">切换地址</XtxButton>
              <XtxButton class="btn">添加地址</XtxButton>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <!-- 渲染的列表数据 -->
              <tr v-for="i in checkoutInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="" />
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.payPrice }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;"
            >不限送货时间：周一至周日</a
          >
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color: #999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <!-- 多级渲染要判断 -->
        <div class="box-body" v-if="checkoutInfo.summary">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkoutInfo.summary.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkoutInfo.summary.totalPrice }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkoutInfo.summary.postFee }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">¥{{ checkoutInfo.summary.totalPayPrice }}</dd>
            </dl>
          </div>
          <!-- 提交订单 -->
          <div class="submit">
            <XtxButton type="primary" @click="createOrders">提交订单</XtxButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createOrder as createOrderApi, findCheckoutInfo } from '@/api/order'
import { ref } from 'vue-demi'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// 提交订单api
export default {
  name: 'XtxPayCheckoutPage',
  setup () {
    // 订单结算信息----购物车数据
    const checkoutInfo = ref({})
    // 地址
    const curAddress = ref(null)
    const store = useStore()
    const router = useRouter()
    // 获取
    const getOrder = async () => {
      // { page = 1, pageSize = 10, orderState = 0 }
      // 这里能拿到登录人的购物车选中数据是因为登录后在购物车里调用了接口直接操作了数据库
      const { result } = await findCheckoutInfo()
      console.log('订单数据', result)
      checkoutInfo.value = result
      curAddress.value = checkoutInfo.value.userAddresses[0]
    }
    getOrder()
    // 填写的订单数据-----创建订单确认提交
    const createOrders = async () => {
      // 准备提交的数据对象
      //       deliveryTimeType: 1, 配送时间类型，1为不限，2为工作日，3为双休或假日
      //  payType: 1, 支付方式，1为在线支付，2为货到付款
      //  buyerMessage: '', 买家留言
      //  addressId: null, // 地址id
      //  goods: [] // { skuId, count } 由所有商品的skuId 和 count字段组成的数组必须传
      const reqData =
      {
        deliveryTimeType: 1, // 配送时间类型，1为不限，2为工作日，3为双休或假日
        payType: 1, // 支付方式，1为在线支付，2为货到付款
        buyerMessage: '', // 买家留言
        addressId: '1429265915203031042', // 地址id
        goods: [] // { skuId, count } 由所有商品的skuId 和 count字段组成的数组
      }
      // 处理goods数据
      reqData.goods = checkoutInfo.value.goods.map(({ skuId, count }) => ({ skuId, count }))
      const { result } = await createOrderApi(reqData)
      // console.log('我', res)// ['1535011', '1127094', '1148091']
      // 调接口传递已经选中的商品及参数对象---后台会帮我们把购物车中下单了的商品删除所以要刷新购物车----跳转到支付页面
      store.dispatch('cart/getCartList')
      router.push(`/pay?id=${result.id}`)
    }
    return {
      checkoutInfo,
      curAddress,
      createOrders
    }
  }
}
</script>
<style scoped lang="less">
.xtx-pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: @xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>

<template>
  <div class="account-box">
    <!-- 开启规则不用v-model数据但是要写错误信息 -->
    <Form class="form" :validation-schema="rules" v-slot="{ errors }" ref="fm">
      <!-- 错误信息如果有错误返回一个错误对象中有错误信息 通过返回null-->
      <p>{{ errors }}</p>
      <!-- 表单元素 -->
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-user"></i>
          <Field
            type="text"
            placeholder="请输入用户名或手机号"
            v-model="FormData.account"
            name="account"
            :class="{ error: errors.account }"
          />
        </div>
        <!-- 表单验证错误信息提示 -->
        <div
          v-if="errors.account"
          class="error"
          :class="{ errtips: errors.account }"
        >
          <i class="iconfont icon-warning" />请输入手机号
        </div>
      </div>
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-lock"></i>
          <Field
            type="password"
            placeholder="请输入密码"
            v-model="FormData.password"
            name="password"
            :class="{ error: errors.password }"
          />
        </div>
        <!-- 表单验证错误信息提示 -->
        <div
          v-if="errors.password"
          class="error"
          :class="{ errtips: errors.password }"
        >
          <i class="iconfont icon-warning" />请输入密码
        </div>
      </div>
      <div class="form-item">
        <div class="agree">
          <!-- 单选框 支持双向绑定-->
          <!-- <XtxCheckbox v-model="FormData.isAgree"/> -->
          <!-- 使用Field来渲染一个自定义的组件 而不是浏览器支持的原生标签时，需要我们添加as属性来渲染自定义组件 -->
          <Field v-model="FormData.isAgree" as="XtxCheckbox" name="isAgree">
            <span>我已同意</span>
          </Field>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <!-- 表单验证错误信息提示 -->
        <div
          v-if="errors.isAgree"
          class="error"
          :class="{ errtips: errors.isAgree }"
        >
          <i class="iconfont icon-warning" />{{ errors.isAgree }}
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="submit">登录</a>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
// vee-validate提供组件需要注册类似element中el-Form
import { Form, Field } from 'vee-validate'
import { reactive, ref } from 'vue'
// 规则
import rulesFns from '@/utils/vee-validate-schema'
import { useStore } from 'vuex'
import msg from '@/components/Message'
import { useRoute, useRouter } from 'vue-router'
// 路由
export default {
  /**
   *  安装
   * 准备表单数据和校验规则
   * 使用form和field等组件
   */
  components: {
    // 表单
    Form,
    // 表单域input
    Field
  },
  setup () {
    // router实例
    const router = useRouter()
    // 路由规则
    const route = useRoute()
    // store实例
    const store = useStore()
    // 表单实例
    const fm = ref(null)
    // 表单数据
    const FormData = reactive({
      account: 'xiaotuxian001', // 用户名
      password: '123456', // 密码
      // 父改子数据不同步无效果因为插件还没更新好所以默认要给false
      isAgree: false
    })
    // 表单规则----普通对象也行 注意不能重名了rules
    const rules = reactive({
      account: rulesFns.account,
      password: rulesFns.password,
      isAgree: rulesFns.isAgree
    })
    // 1. 把input改成 Field 组件，默认解析成input
    // 2. Field 添加name属性，作用是指定使用规则中哪个校验规则(函数)
    // 3. Field添加v - model，作用是提供表单数据的双向绑定
    // 4. 发生表单校验错误，显示错误类名error，提示红色边框并显示errors对象中的错误提示信息

    // 整体表单校验
    // 1. 通过ref获得表单组件对象
    // 2. 执行组件对象身上的validate方法 （执行完毕返回promise对象）

    const submit = async () => {
      // await
      // 调用接口
      // console.log('loading', fm.value.validate())
      const { valid } = await fm.value.validate() // 拿到valid布尔值
      // console.log(res)
      if (valid) {
        // 掉接口
        // console.log('loading')
        try {
          // 如果用ref要.value
          await store.dispatch('user/getUser', FormData)
          msg({ type: 'success', text: '登录成功' })
          // router跳转---携带参数
          router.replace(route.query.redirectUrl || '/')
        } catch (error) {
          console.dir(error)
          msg({ type: 'error', text: error.response.data.message })
        }
      }
    }
    return { FormData, rules, fm, submit }
  }
}
</script>
<style lang="less" scoped>
.errtips {
  color: #e40438;
  animation-name: errtips;
  animation-duration: 0.5s;
}
@keyframes errtips {
  10% {
    transform: translateY(1px);
  }
  20% {
    transform: translateY(-1px);
  }
  30% {
    transform: translateY(1px);
  }
  40% {
    transform: translateY(-1px);
  }
  50% {
    transform: translateY(1px);
  }
  60% {
    transform: translateY(-1px);
  }
  70% {
    transform: translateY(1px);
  }
  80% {
    transform: translateY(-1px);
  }
  90% {
    transform: translateY(1px);
  }
  100% {
    transform: translateY(0);
  }
}

// 账号容器
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 20px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>

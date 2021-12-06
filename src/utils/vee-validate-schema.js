
/**
 * 校验表单插件和验证规则
 * validation-schema :  配置校验规则 rules
 * v-slot：导出错误对象=>错误提示信息
 */
export default {
  // 校验account
  /**
   *
   * @param {*} value 表单输入的值（输入框的值）
   * @returns 校验不通过：错误提示信息 | 校验通过该：true
   */
  account (value) {
    if (!value) return '请输入用户名'
    return true
  },
  password (value) {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    return true
  },
  isAgree (value) {
    if (!value) return '请勾选同意用户协议'
    return true
  }
}

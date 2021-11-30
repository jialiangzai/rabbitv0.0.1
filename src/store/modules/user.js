// 用户状态
export default {
  // 开启模块化命名空间
  namespaced: true,
  // 返回函数显示一个对象  vue2中的data避免复用时候引入错误
  state: () => ({
    // 登录人信息
    profile: {
      id: '',
      avatar: '',
      nickname: '',
      account: '',
      mobile: '',
      token: ''
    }
  }),
  mutations: {
    // 测试修改名字
    updateValue (state, payload) {
      state.profile.nickname = payload
    }
  }
}

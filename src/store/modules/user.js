// 登录接口
import { userAccountLogin } from '@/api/user'

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
    // updateValue (state, payload) {
    //   state.profile.nickname = payload
    // }
    // 新增
    setUser (state, payload) {
      state.profile = payload
    },
    delUser (state) {
      state.profile = {}
    }
  },
  actions: {
    /**
     *
     * @param {*} 调用mutation中的方法
     * @param {*} userInfo 登录页上的名字和密码
     */
    async getUser ({ commit }, userInfo) {
      const { result } = await userAccountLogin({
        account: userInfo.account,
        password: userInfo.password
      })
      console.log('登录人信息', result)
      commit('setUser', result)
    },
    // 退出-----调用时直接调actions就行了
    logout ({ commit }) {
      commit('delUser')
    }
  }
}

import { findHeadCategory } from '@/api/home'
export default {
  namespaced: true,
  state: () => {
    return {
      catelist: [] // 分类列表
    }
  },
  // 加载数据成功后需要修改list所以需要mutations函数
  mutations: {
    setCategory (state, headCategory) {
      state.catelist = headCategory
    }
  },
  // 需要向后台加载数据，所以需要actions函数获取数据
  actions: {
    async getCategory (ctx) {
      // 1.调用接口方法
      // 2.成功获取到数据之后触发setList mutation函数
      const res = await findHeadCategory()
      console.log(res.result)
      ctx.commit('setCategory', res.result)
    }
  }
}

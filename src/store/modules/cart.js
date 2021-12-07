// 购物车状态
export default {
  namespaced: true,
  state: () => ({
    list: []
  }),
  mutations: {
    // 向list中添加商品数据
    /**
     *
     * @param {*} state 获取变量对象
     * @param {*} good 传入的新商品对象
     */
    addListCart (state, good) {
      /**
      * 1. 把sku选择的商品对象push或unshift到list
      * 2. 判断skuId(因为商品id是表示商品对象不是唯一但是不同规格sku他的skuId不同)
      *    如果加入过skuId增加数量，如果没加入过直接新增
      * goods当前要加入的商品对象和list去判断-------findinde
      */
      const AddedIndex = state.list.findIndex(item => item.skuId === good.skuId)
      // 不是-1表示找到了-----加入过购物车-----找到索引对应的商品对象做新增数量
      if (AddedIndex > -1) {
        state.list[AddedIndex].count += good.count
      } else {
        // 没加入过购物车
        state.list.unshift(good)
      }
    }
  },
  /**
   * 区分是否登录
   * 未登录 用addListCart存本地
   * 登录 调接口存数据库
   */
  // 登录后加入购物车准备
  actions: {
    // 注意跨模块调用数据在上下文context使用rootState----拿到所有的vuex数据
    // goodCart要添加的商品对象
    addCartActions ({ commit, rootState }, goodCart) {
      console.log('上下文rootState数据', rootState)
      if (rootState.user.profile.token) {
        // 已经登录---调接口
      } else {
        // 未登录
        commit('addListCart', goodCart)
      }
    }
  }
}

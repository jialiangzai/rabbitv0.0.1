// 购物车状态
export default {
  namespaced: true,
  state: () => ({
    list: []
  }),
  getters: {
    // 可能存在无效过期的商品所以过滤
    // 1. 有效商品列表 =》无效商品（没库存或下架了）
    // 2. 选中的购物车商品数据
    // 3. 选中商品总价
    // 4. 购物车中有效商品是否是全部选中状态
    // getters类似计算属性可以依赖另一个计算属性进行计算即第二个参数
    // 计算有效商品列表 isEffective = true  filter
    validList: state => {
      // 留下isEffective为true的如果带花括号就写return
      return state.list.filter(item => item.isEffective)
    },
    // 已选中列表 selected = true
    validSeled: (state, getters) => {
      return getters.validList.filter(item => item.selected)
    },
    // 已选择列表总钱数  selectedList 中所有项的单价*数据进行叠加
    validSeledTotal: (state, getters) => {
      return getters.validSeled.reduce((total, item) => (total += item.nowPrice * item.count), 0)
    },
    // 全选：有效列表中的seleted字段全为true 才为true
    isAll: (state, getters) => {
      return getters.validList.every(item => item.selected)
    }
  },
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
    },
    // 修改单选状态
    /**
     *
     * @param {*} state
     * @param {*} param1 当前选中的商品及状态------因为需要知道是哪一个具体的商品对象
     */
    setSignCheck (state, { good, sel }) {
      state.list.find(item => item.skuId === good.skuId).selected = sel
    },
    // 全选按钮状态
    setTotal (state, sel) {
      state.list.forEach(item => {
        item.selected = sel
      })
    },
    // 删除某项商品
    delSign (state, good) {
      // const i = state.list.findIndex(item => item.id === good.id)
      // state.list.splice(i, 1)
      state.list = state.list.filter(item => item.id !== good.id)
    },
    // 修改数量
    changeNum (state, { good, num }) {
      state.list.find(item => item.skuId === good.skuId).count = num
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
    // actions中的方法函数都有一个返回值且是promise对象即使用者调用dispatch方法返回promise
    addCartActions ({ commit, rootState }, goodCart) {
      // console.log('上下文rootState数据', rootState)
      if (rootState.user.profile.token) {
        // 已经登录---调接口
      } else {
        // 未登录
        commit('addListCart', goodCart)
        return '加入购物车成功'
      }
    },
    // 单选
    signCheckActions ({ commit, rootState }, { good, sel }) {
      // console.log('上下文rootState数据', rootState)
      if (rootState.user.profile.token) {
        // 已经登录---调接口
      } else {
        // 未登录
        commit('setSignCheck', { good, sel })
        return '操作成功'
      }
    },
    // 全选
    TotalActions ({ commit, rootState }, sel) {
      if (rootState.user.profile.token) {
        // 已经登录---调接口
      } else {
        // 未登录
        commit('setTotal', sel)
        return '操作成功'
      }
    },
    // 删除
    delSignActions ({ commit, rootState }, good) {
      if (rootState.user.profile.token) {
        // 已经登录---调接口
      } else {
        // 未登录
        commit('delSign', good)
        return '删除成功'
      }
    },
    // 修改数量
    changeNumActions ({ commit, rootState }, { good, num }) {
      if (rootState.user.profile.token) {
        // 已经登录---调接口
      } else {
        // 未登录
        commit('changeNum', { good, num })
      }
    }
  }
}

<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <ul  class="goods-list">
      <li v-for="item in goods" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="">
          <p class="name">{{item.title}}</p>
          <p class="desc">{{item.alt}}</p>
        </RouterLink>
      </li>
    </ul>
    <template #right>
      <xtx-more></xtx-more>
    </template>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import { findHot } from '@/api/home'
export default {
  name: 'HomeHot',
  components: { HomePanel },
  data () {
    return {
      goods: []
    }
  },
  async created () {
    const data = await findHot()
    this.goods = data.result
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>

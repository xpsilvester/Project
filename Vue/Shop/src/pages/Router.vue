<template>
  <div class="router">
    <Slider :slides="slides" :inv="inv"/>
    <h3>热销产品</h3>
    <div class="hot-pro" @click="toDetail(hot.id)">
        <img :src="hot.img" />
        <div class="l1">
            <div class="name">{{hot.name}}</div>
            <div class="price">{{hot.price}}起</div>
        </div>
        <div class="l1">
            <div class="brief">{{hot.brief}}</div>
            <div class="buybtn">立即购买</div>
        </div>
    </div>
    <div class="pro-list">
      <ul>
        <li v-for="item in proList" :key="item.name" @click="toDetail(item.id)">
          <img :src="item.img" />
          <p class="name">{{item.name}}</p>
          <p class="brief">{{item.brief}}</p>
          <p class="price">{{item.price}}</p>
          <p class="buybtn">立即购买</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Slider from '@/components/Slider'
import utils from '@/lib/utils'
export default {
  name: 'Router',
  data () {
    return {
      msg: '推荐',
      hot: {},
      proList: [],
      slides: [
        {
          'title': '111',
          'img': require('@/assets/slider1.jpg'),
          'href': '/'
        }
      ],
      inv: 5000
    }
  },
  methods: {
    toDetail: function (id) {
      this.$router.push({path: '/detail', query: { id: id }})
    }
  },
  components: {
    Slider
  },
  created () {
    this.$http.get('/api/router').then((data) => {
      let hot = utils.reSrc(data.body.data[0].hotPro, 'jpg')
      this.hot = hot[0]
      this.proList = utils.reSrc(data.body.data[0].proList, 'jpg')
      this.slides = utils.reSrc(data.body.data[0].slides, 'jpg')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Router.scss";
</style>

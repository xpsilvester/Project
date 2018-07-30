<template>
  <div class="detail">
    <Header barName="商品详情" />
    <Slider :slides="slides" :inv="inv"/>
    <div class="overview">
      <h3>{{title}}</h3>
      <p class="brief">{{brief}}</p>
      <div class="price">
        <p>{{price}}</p>
      </div>
    </div>
    <div class="product-section">
      <div class="slice">
        <p class="chose">已选</p>
        <p class="type">{{type[0].name}}</p>
        <span class="arrow"></span>
      </div>
      <div class="slice">
        <p class="chose">送至</p>
        <p class="type">北京市 东城区<span class="hasGoods">有现货</span></p>
        <span class="arrow"></span>
      </div>
      <div class="slice">
        <div class="policy"><span></span>7天无理由退货</div>
        <div class="policy"><span></span>15天质量问题换货</div>
        <div class="policy"><span></span>365天保修</div>
      </div>
    </div>
    <div class="product-section">
      <div class="slice">
        <p class="review">用户评价({{reviewNum}})</p>
        <span class="arrow"></span>
      </div>
      <div class="comment-title">
        <p class="name">{{comment[0].user}}</p>
        <p class="date">{{comment[0].date}}</p>
      </div>
      <div class="comment-box">
        {{comment[0].content}}
      </div>
      <div class="comment-reply">
        <span>官方回复：</span>
        {{comment[0].reply}}
      </div>
    </div>
    <div class="description">
      <div class="tab">
        <span :class="{ active : tabState == true }" @click="changeTab">概述</span>
        <div class="line"></div>
        <span :class="{ active : tabState == false}" @click="changeTab">参数</span>
      </div>
      <div class="producShow" v-if="tabState == true">
        <img v-for="(item,index) in producShow" :key="index" :src="item.img" />
      </div>
      <div class="productArgs" v-else>
        <img v-for="(item,index) in productArgs" :key="index" :src="item.img" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import utils from '@/lib/utils'
import Slider from '@/components/Slider'
import { mapMutations } from 'vuex'
export default {
  name: 'Detail',
  data () {
    return {
      msg: '商品详情',
      slides: [
        {
          'title': '111',
          'img': require('@/assets/mi8_1.jpg'),
          'href': '/'
        }
      ],
      inv: 5000,
      title: '',
      brief: '',
      price: '',
      tabState: true,
      type: [
        {
          name: ''
        }
      ],
      reviewNum: 0,
      comment: [
        {
          'user': '',
          'date': '',
          'content': '',
          'reply': ''
        }
      ],
      producShow: [],
      productArgs: []
    }
  },
  components: {
    Header,
    Slider
  },
  methods: {
    ...mapMutations(['updateDetail']),
    toHome: function () {
      this.$router.push({ path: '/' })
    },
    getPath: function () {
      return this.$route.name
    },
    getId: function () {
      return this.$route.query.id
    },
    changeTab: function () {
      this.tabState = !this.tabState
    },
    setDetail: function (data) {
      this.updateDetail(data)
    }
  },
  mounted () {
    // console.log(this.$route.query.id)
  },
  created () {
    this.$http.get('/api/detail').then((data) => {
      this.slides = utils.reSrc(data.body.data[0]['slides_1'], 'jpg')
      let id = this.getId()
      this.title = data.body.data[id].title
      this.brief = data.body.data[id].brief
      this.price = data.body.data[id].price
      this.type = data.body.data[id].type
      this.reviewNum = data.body.data[id].reviewNum
      this.comment = data.body.data[id].comment
      this.producShow = utils.reSrc(data.body.data[id].producShow, 'jpg')
      this.productArgs = utils.reSrc(data.body.data[id].productArgs, 'jpg')
      this.setDetail({
        'id': id,
        'title': this.title,
        'img': require('../assets/cart_mi8.jpg'),
        'price': this.price,
        'number': 1,
        'select': true
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Detail.scss";
</style>

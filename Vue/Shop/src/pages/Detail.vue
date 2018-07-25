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
        <p class="type">小米8 SE 4GB+64GB 金色 x1</p>
        <span class="arrow"></span>
      </div>
      <div class="slice">
        <p class="chose">送至</p>
        <p class="type">北京市 东城区</p>
        <span class="hasGoods">有现货</span>
        <span class="arrow"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import utils from '@/lib/utils'
import Slider from '@/components/Slider'
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
      price: ''
    }
  },
  components: {
    Header,
    Slider
  },
  methods: {
    toHome: function () {
      this.$router.push({ path: '/' })
    },
    getPath: function () {
      return this.$route.name
    }
  },
  mounted () {
    // console.log(this.getPath())
  },
  created () {
    this.$http.get('/api/detail').then((data) => {
      this.slides = utils.reSrc(data.body.data[0]['slides_1'], 'jpg')
      this.title = data.body.data[1].title
      this.brief = data.body.data[1].brief
      this.price = data.body.data[1].price
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Detail.scss";
</style>

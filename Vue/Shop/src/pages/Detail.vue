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
        <p class="review">用户评价(8226)</p>
        <span class="arrow"></span>
      </div>
      <div class="comment-title">
        <p class="name">用户A</p>
        <p class="date">2018-12-30 13:40:21</p>
      </div>
      <div class="comment-box">
        好评好评好评！好评好评好评！好评好评好评！好评好评好评！好评好评好评！好评好评好评！好评好评好评！好评好评好评！
        好评好评好评！好评好评好评！好评好评好评！好评好评好评！好评好评好评！好评好评好评！好评好评好评！好评好评好评！
      </div>
      <div class="comment-reply">
        <span>官方回复：</span>
        感谢感谢感谢！ 感谢感谢感谢！ 感谢感谢感谢！ 感谢感谢感谢！ 感谢感谢感谢！ 感谢感谢感谢！ 感谢感谢感谢！ 感谢感谢感谢！
      </div>
    </div>
    <div class="description">
      <div class="tab">
        <span :class="{ active : tabState == true }" @click="changeTab">概述</span>
        <div class="line"></div>
        <span :class="{ active : tabState == false}" @click="changeTab">参数</span>
      </div>
      <div class="producShow" v-if="tabState == true">
        <img src="@/assets/mi8_des1.jpg" />
        <img src="@/assets/mi8_des2.jpg" />
        <img src="@/assets/mi8_des3.jpg" />
      </div>
      <div class="productArgs" v-else>
        <img src="@/assets/mi8_args1.jpg" />
        <img src="@/assets/mi8_args2.jpg" />
        <img src="@/assets/mi8_args3.jpg" />
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
      price: '',
      tabState: true
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
    },
    changeTab: function () {
      this.tabState = !this.tabState
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

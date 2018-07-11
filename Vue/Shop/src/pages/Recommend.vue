<template>
  <div class="recommend">
    <Slider />
    <h3>热销产品</h3>
    <div class="hot-pro">
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
  </div>
</template>

<script>
import Slider from '@/components/Slider'
export default {
  name: 'Recommend',
  data () {
    return {
      msg: '推荐',
      hot: {
        img: '',
        name: '',
        price: '',
        brief: ''
      }
    }
  },
  components: {
    Slider
  },
  created () {
    this.$http.get('/api/recommend').then((data) => {
      console.log(data.body.data)
      this.hot = data.body.data[0]
      this.hot.img = require('../assets/' + data.body.data[0].hotProImg + '.jpg')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Recommend.scss";
</style>

<template>
  <div class="recommend">
    <Slider />
    <h3>热销产品</h3>
    <div class="hot-pro">
        <img :src="hotProImg" />
        <div class="l1">
            <div class="name">红米Note 5 AI双摄</div>
            <div class="price">￥1099起</div>
        </div>
        <div class="l1">
            <div class="brief">1.4μm大像素 AI双摄</div>
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
      hotProImg: ''
    }
  },
  components: {
    Slider
  },
  created () {
    this.$http.get('/api/recommend').then((data) => {
      console.log(data.body.data)
      this.hotProImg = require('../assets/' + data.body.data[0].hotProImg + '.jpg')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Recommend.scss";
</style>

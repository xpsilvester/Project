<template>
  <div class="aboutMain">
    <div class="aboutNickName">
        <div class="img">
            <img src="@/assets/default138.jpg">
        </div>
        <span class="nickName">宇宙无敌霹雳侠</span>
        <div class="arrow">
            <span class="icon-arr"></span>
        </div>
    </div>
    <div class="orderListAll">
        <span style="width:27%;text-align:center">我的订单</span>
        <span style="width:63%;text-align:right;color:#ccc">全部</span>
        <div class="arrow">
            <span class="icon-arr"></span>
        </div>
    </div>
    <ul class="orderListStatus">
        <li v-for="item in orderListStatus" :key="item.tagName">
            <img :src="item.img" alt="图片">
            <p>{{item.tagName}}</p>
        </li>
    </ul>
    <div class="arrival aboutTip" v-for="item in aboutTip" :key="item.tipName">
        <div class="icon">
            <img :src="item.img">
        </div>
        <span>{{item.tipName}}</span>
        <div class="arrow">
            <span class="icon-arr"></span>
        </div>
    </div>
  </div>
</template>

<script>
import utils from '@/lib/utils'
export default {
  name: 'About',
  data () {
    return {
      msg: '关于',
      orderListStatus: [],
      aboutTip: []
    }
  },
  created () {
    this.$http.get('/api/about').then((data) => {
      this.orderListStatus = utils.reSrc(data.body.data[0].orderListStatus, 'png')
      this.aboutTip = utils.reSrc(data.body.data[0].aboutTip, 'png')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./About.scss";
</style>

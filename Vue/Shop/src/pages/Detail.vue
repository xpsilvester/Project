<template>
  <div class="detail">
    <Header barName="商品详情" />
    <Slider :slides="slides" :inv="inv"/>
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
      inv: 5000
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
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Detail.scss";
</style>

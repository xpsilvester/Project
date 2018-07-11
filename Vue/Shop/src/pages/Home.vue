<template>
  <div class="home">
      <Tab />
      <Slider />
  </div>
</template>

<script>
import Tab from '@/components/Tab'
import Slider from '@/components/Slider'
export default {
  name: 'Home',
  data () {
    return {
      msg: '首页'
    }
  },
  components: {
    Tab,
    Slider
  },
  created () {
    this.$http.get('/api/goods').then((data) => {
      console.log(data.body.data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Home.scss";
</style>

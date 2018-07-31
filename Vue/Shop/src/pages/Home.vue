<template>
  <div class="home">
      <Header />
      <Tab />
      <keep-alive>
        <router-view class="home-child"></router-view>
      </keep-alive>
  </div>
</template>

<script>
import Tab from '@/components/Tab'
import Recommend from '@/pages/Recommend'
import Header from '@/components/Header'
export default {
  name: 'Home',
  data () {
    return {
      msg: '首页'
    }
  },
  components: {
    Tab,
    Recommend,
    Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Home.scss";
</style>

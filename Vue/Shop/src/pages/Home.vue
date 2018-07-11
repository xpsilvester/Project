<template>
  <div class="home">
      <Tab />
      <Recommend />
  </div>
</template>

<script>
import Tab from '@/components/Tab'
import Recommend from '@/pages/Recommend'
export default {
  name: 'Home',
  data () {
    return {
      msg: '首页'
    }
  },
  components: {
    Tab,
    Recommend
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Home.scss";
</style>

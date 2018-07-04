<template>
  <div class="home">
      <Tab />
  </div>
</template>

<script>
import Tab from '@/components/Tab'
export default {
  name: 'Home',
  data () {
    return {
      msg: '首页'
    }
  },
  components: {
    Tab
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

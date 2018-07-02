<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Bottom />
  </div>
</template>

<script>
import Bottom from '@/components/Bottom-bar'
export default {
  name: 'Home',
  data () {
    return {
      msg: '首页'
    }
  },
  components: {
    Bottom
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Home.scss";
</style>

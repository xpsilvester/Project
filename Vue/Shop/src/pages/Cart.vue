<template>
  <div class="hello">
    <Header barName="购物车" />
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'Cart',
  data () {
    return {
      msg: '购物车'
    }
  },
  components: {
    Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Cart.scss";
</style>

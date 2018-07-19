<template>
  <div class="cart">
    <Header barName="购物车" />
    <div class="empty">
      <p>购物车还是空的~</p>
      <div @click="toHome">去逛逛</div>
    </div>
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
  },
  methods: {
    toHome: function () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Cart.scss";
</style>

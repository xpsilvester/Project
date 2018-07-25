<template>
  <div>
    <div class="bottom" v-if="getPath != 'Detail'">
        <router-link to="/">
          <img v-if="getPath == 'Home'" :src="homeImg[1]">
          <img v-else :src="homeImg[0]">
          <p>首页</p>
        </router-link>
        <router-link to="Category">
          <img v-if="getPath == 'Category'" :src="categoryImg[1]">
          <img v-else :src="categoryImg[0]">
          <p>分类</p>
        </router-link>
        <router-link to="Cart">
          <img v-if="getPath == 'Cart'" :src="cartImg[1]">
          <img v-else :src="cartImg[0]">
          <p>购物车</p>
        </router-link>
        <router-link to="About">
          <img v-if="getPath == 'About'" :src="aboutImg[1]">
          <img v-else :src="aboutImg[0]">
          <p>我的</p>
        </router-link>
    </div>
    <div class="bottom" v-else>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bottom',
  data () {
    return {
      path: '',
      homeImg: [require('../assets/home.png'), require('../assets/home_active.png')],
      categoryImg: [require('../assets/category.png'), require('../assets/category_active.png')],
      cartImg: [require('../assets/cart.png'), require('../assets/cart_active.png')],
      aboutImg: [require('../assets/about.png'), require('../assets/about_active.png')]
    }
  },
  computed: {
    getPath: function () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

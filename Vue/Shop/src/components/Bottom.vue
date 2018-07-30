<template>
  <div>
    <div class="bottom" v-if="getPath == 'Detail'">
      <router-link to="/">
        <img :src="homeImg[0]">
        <p>首页</p>
      </router-link>
      <div class="line"></div>
      <router-link to="Cart">
        <img :src="cartImg[0]">
        <p>购物车</p>
        <span>{{number}}</span>
      </router-link>
      <div class="addCart" @click="addToCart">
        加入购物车
      </div>
    </div>
    <div class="bottom" v-else-if="getPath == 'Cart'">
      <div class="cal">
        <p>共{{number}}件 金额：</p>
        <p><span>{{sum}}</span>元</p>
      </div>
      <div class="continue">
        <router-link to="/">
          继续购物
        </router-link>
      </div>
      <div class="buy">去结算</div>
    </div>
    <div class="bottom" v-else>
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
          <span>{{number}}</span>
        </router-link>
        <router-link to="About">
          <img v-if="getPath == 'About'" :src="aboutImg[1]">
          <img v-else :src="aboutImg[0]">
          <p>我的</p>
        </router-link>
    </div>
    <Log content="已加入购物车" v-if="added" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Log from '@/components/Log'
export default {
  name: 'Bottom',
  added: false,
  data () {
    return {
      path: '',
      homeImg: [require('../assets/home.png'), require('../assets/home_active.png')],
      categoryImg: [require('../assets/category.png'), require('../assets/category_active.png')],
      cartImg: [require('../assets/cart.png'), require('../assets/cart_active.png')],
      aboutImg: [require('../assets/about.png'), require('../assets/about_active.png')],
      added: false
    }
  },
  components: {
    Log
  },
  computed: {
    ...mapGetters(['sum']),
    getPath: function () {
      return this.$route.name
    },
    number: function () {
      return this.$store.getters.goodsNumber
    }
  },
  methods: {
    ...mapMutations(['addGoods']),
    addToCart: function () {
      this.addGoods({
        'id': 1,
        'title': '小米8 全网通版 6GB内存 128GB 黑色',
        'img': require('../assets/cart_mi8.jpg'),
        'price': 2999,
        'number': 1,
        'select': true
      })
      this.added = true
      setTimeout(() => {
        this.added = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

<template>
  <div class="cart">
    <Header barName="购物车" />
    <div class="empty" v-if="goodsList == []">
      <p>购物车还是空的~</p>
      <div @click="toHome">去逛逛</div>
    </div>
    <div class="pro-top"></div>
    <div class="product" v-for="(item,index) in goodsList" :key="index">
      <div :class="[{choosed : item.select == true},'choose']" @click="toggleSelect(item.id)"></div>
      <div class="img">
        <img src="@/assets/cart_mi8.jpg" alt="" />
      </div>
      <div class="info">
        <p class="name">{{item.title}}</p>
        <p class="price">售价：{{item.price}}元</p>
        <div class="num">
          <div class="input-number">
            <div class="input-sub" @click="changeNumber(item.id,-1)"></div>
            <div class="input-num">{{item.number}}</div>
            <div class="input-add" @click="changeNumber(item.id,1)"></div>
          </div>
          <div class="delete" @click="del(item.id)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { mapMutations, mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters(['sum']),
    goodsList: function () {
      return this.$store.state.goodsList
    },
    number: function () {
      return this.$store.getters.goodsNumber
    }
  },
  methods: {
    ...mapMutations(['deleteGoods', 'updateGoods']),
    findPosition: function (id) {
      return this.goodsList.findIndex(item => {
        return item.id === id
      })
    },
    changeNumber: function (id, val) {
      let i = this.findPosition(id)
      let num = this.goodsList[i].number
      this.updateGoods({
        index: i,
        key: 'number',
        value: num + val <= 0 ? 1 : num + val
      })
    },
    del: function (id) {
      let i = this.findPosition(id)
      this.deleteGoods(i)
    },
    toggleSelect: function (id) {
      let i = this.findPosition(id)
      let select = this.goodsList[i].select
      this.updateGoods({
        index: i,
        key: 'select',
        value: !select
      })
    },
    toHome: function () {
      this.$router.push({ path: '/' })
    }
  },
  mounted () {
    console.log(this.goodsList, this.number)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Cart.scss";
</style>

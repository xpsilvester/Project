<template>
  <div class="header-container">
    <div class="header" v-if="barName == 'Home'">
      <div class="logo">
          <p>SHOP</p>
          <p>官方商城</p>
      </div>
      <div class="search" @click="toSearch">
          <span>
            <img src="../assets/search_icon.png"/>
          </span>
          <input autocomplete="off" type="text" name="txtsearchinput" class="searchText" value="" maxlength="50" placeholder="搜索商品名称" />
      </div>
      <div class="info">
        <img src="../assets/user.png" />
      </div>
    </div>
    <div class="header-bar" v-else-if="getPath == 'Search'">
      <span class="back" @click="back"></span>
      <input type="text" placeholder="搜索商品名称" autofocus="autofocus"/>
      <span class="search"></span>
    </div>
    <div class="header-bar" v-else>
      <span class="back" @click="back"></span>
      <p>{{barName}}</p>
      <span class="search" @click="toSearch"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    barName: {
      type: String,
      default: 'Home'
    }
  },
  data () {
    return {
      path: ''
    }
  },
  methods: {
    back: function () {
      this.$router.go(-1)
    },
    toSearch: function () {
      this.$router.push({ path: '/search' })
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

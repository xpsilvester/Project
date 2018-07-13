<template>
  <div class="header" v-if="getPath != 'About'">
      <div class="logo">
          <p>SHOP</p>
          <p>官方商城</p>
      </div>
      <div class="search">
          <span>
            <img src="../assets/search_icon.png"/>
          </span>
          <input autocomplete="off" type="text" name="txtsearchinput" class="searchText" value="" maxlength="50" placeholder="搜索商品名称" />
      </div>
      <div class="info">
        <img src="../assets/user.png" />
      </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      path: ''
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

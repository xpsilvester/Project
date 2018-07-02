<template>
  <div class="bottom">
      <router-link to="/test">Test</router-link>
      <router-link to="/home">Home</router-link>
      <router-link to="/cart">Cart</router-link>
      <router-link to="/category">Category</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
export default {
  name: 'Bottom-bar'
}
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

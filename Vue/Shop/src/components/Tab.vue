<template>
  <div class="tab">
      <div class="tabUl">
          <router-link to="/">推荐</router-link>
          <router-link to="/phone">手机</router-link>
          <router-link to="/computer">电脑</router-link>
          <router-link to="/router">路由器</router-link>
          <router-link to="/television">电器</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      path: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

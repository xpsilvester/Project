<template>
  <div class="tab">
      <ul>
          <li class="active">推荐</li>
          <li>手机</li>
          <li>电脑</li>
          <li>路由器</li>
          <li>电器</li>
      </ul>
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

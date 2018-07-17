<template>
  <div class="search">
    <Header />
    <p class="hot">热门搜索</p>
    <div class="search-key">
      <p>手机</p>
      <p>台式机</p>
      <p>笔记本</p>
      <p>电器</p>
      <p>平板</p>
      <p>电视</p>
      <p>智能手表</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'Search',
  data () {
    return {
      msg: '搜索'
    }
  },
  components: {
    Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./Search.scss";
</style>

<template>
  <div class="hello">
    <Header barName="分类" />
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'Category',
  data () {
    return {
      msg: '分类'
    }
  },
  components: {
    Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Category.scss";
</style>

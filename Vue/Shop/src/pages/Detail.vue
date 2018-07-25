<template>
  <div class="detail">
    <div class="empty">
      <p>商品详情</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'Detail',
  data () {
    return {
      msg: '购物车'
    }
  },
  components: {
    Header
  },
  methods: {
    toHome: function () {
      this.$router.push({ path: '/' })
    },
    getPath: function () {
      return this.$route.name
    }
  },
  mounted () {
    console.log(this.getPath())
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Detail.scss";
</style>

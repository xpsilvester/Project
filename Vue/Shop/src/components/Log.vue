<template>
  <div class="log">
      <p>{{content}}</p>
  </div>
</template>

<script>
export default {
  name: 'Log',
  props: ['content'],
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

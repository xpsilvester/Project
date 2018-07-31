<template>
  <div class="test">
    <button @click="$emit('aaa')">
        Enlarge text
    </button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return { msg: '<h1>PPTList</h1>' }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.class1 {
  background: #444;
  color: #eee;
}
</style>

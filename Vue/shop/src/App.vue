<template>
  <div id="app">
    <img src="./assets/logo.png">
    <template>
      <router-link to="/hello">HelloWorld</router-link>
      <router-link to="/test">Test</router-link>
    </template>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

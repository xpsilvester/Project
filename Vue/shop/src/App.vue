<template>
  <div id="app">
    <img src="./assets/logo.png">
    <template>
      <router-link to="/test">Test</router-link>
      <router-link to="/home">Home</router-link>
      <router-link to="/cart">Cart</router-link>
      <router-link to="/category">Category</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/login">Login</router-link>
    </template>
    <transition>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <Bottom />
  </div>
</template>

<script>
import Bottom from '@/components/Bottom-bar'
export default {
  name: 'App',
  components: {
    Bottom
  }
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

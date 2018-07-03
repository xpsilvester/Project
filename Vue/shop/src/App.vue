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
    <transition name="slide-left">
      <keep-alive>
        <router-view class="child-view"></router-view>
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
.child-view {
  height: 200px;
  width: 100%;
  /* transition: all .8s ease; */
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  /* -webkit-transform: translate(100%, 0); */
  /* transform: translate(100%, 0); */
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  /* -webkit-transform: translate(-100%, 0); */
  /* transform: translate(-100% 0); */
}
</style>

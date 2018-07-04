<template>
  <div id="app">
    <Header />
    <transition name="slide-left">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
    <Bottom />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Bottom from '@/components/Bottom-bar'
export default {
  name: 'App',
  components: {
    Header,
    Bottom
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}
.child-view {
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

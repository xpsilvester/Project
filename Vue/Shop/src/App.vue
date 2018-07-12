<template>
  <div id="app">
    <Header />
    <div id="container">
      <transition name="slide">
        <keep-alive>
          <router-view class="child-view"></router-view>
        </keep-alive>
      </transition>
    </div>
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
body,html{
  margin: 0;
  padding: 0;
  height: 100%;
  position: relative;
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
p{
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
#container{
  width: 100%;
  overflow: hidden;
}
.child-view {
  width: 100%;
  transition: all .8s cubic-bezier(.55, 0, .1, 1);
}
.slide-leave-active {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
  position: absolute;
}
.slide-enter{
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
</style>

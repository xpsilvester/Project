<template>
  <div class="hello">
    <div v-html="msg"></div>
    <div>
      <a href="/#/PPTList">转到PPTList</a>
      <h1>site : {{site}}</h1>
      <h1>url : {{url}}</h1>
      <h1>{{details()}}</h1>
      <h1>Alexa : {{alexa}}</h1>
    </div>
    <label for="r1">修改颜色</label>
    <input type="checkbox" v-model="class1" id="r1">
    <br>
    <div v-bind:class="{'class1':class1}">
      directiva v-bind:class
    </div>
    <h1>{{site}} 反转：{{ reverseMessage }}</h1>
    <input type="button" value="点击" v-on:click="isSeen()"/>
    <h1 v-if="seen">现在你看到了</h1>
    <br>
    <input v-model="site">
    <h1>用过滤器把首字母变大写：{{ site | capitalize }}</h1>
    <Test @aaa="alexa += 1" />
    <Test @bbb="alexa -= 1" />
  </div>
</template>

<script>
import Test from '@/components/Test'
export default {
  name: 'HelloWorld',
  components: {
    Test
  },
  data () {
    var data = { msg: '<h1>Welcome to Vue.js</h1>', site: '学习vue', url: 'www.xpsilvester.com', alexa: 10000, class1: false, seen: true }
    return data
  },
  methods: {
    'details': function () {
      return this.site + '- 学的不仅是技术！'
    },
    'isSeen': function () {
      this.seen = !this.seen
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.slice(0, 2) + value.charAt(2).toUpperCase() + value.slice(3)
    }
  },
  computed: {
    // 计算属性的getter,computed 是基于它的依赖缓存，只有相关依赖发生改变时才会重新取值
    reverseMessage: function () {
      // `this` 指向 vm 实例
      return this.site.split('').reverse().join('')
    }
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

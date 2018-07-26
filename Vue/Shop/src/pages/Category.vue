<template>
  <div class="category">
    <Header barName="分类" />
    <div class="left-side">
      <ul>
        <li v-for="item in typeList" :key="item.id" :class="type == item.id ? 'active' : ''" @click="changeType(item.id)">
          <a>
            <span>{{item.name}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="right-side">
      <div class="list-item" v-for="item in itemList" :key="item.type">
        <div class="item-title">
          <span>{{item.type}}</span>
        </div>
        <ul>
          <li v-for="item2 in item.list" :key="item2.id" @click="toDetail">
            <img :src="item2.img"/>
            <p>{{item2.title}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import utils from '@/lib/utils'
export default {
  name: 'Category',
  data () {
    return {
      msg: '分类',
      type: 1,
      typeList: [],
      itemList: []
    }
  },
  mounted () {
    document.getElementsByClassName('right-side')[0].addEventListener('scroll', this.handleScroll)
  },
  methods: {
    changeType: function (n) {
      this.type = n
      if (n <= 1) {
        document.getElementsByClassName('right-side')[0].scrollTop = 0
      } else if (n === 2) {
        document.getElementsByClassName('right-side')[0].scrollTop = 300
      } else if (n === 3) {
        document.getElementsByClassName('right-side')[0].scrollTop = 600
      } else {
        document.getElementsByClassName('right-side')[0].scrollTop = 901
      }
    },
    handleScroll: function (e) {
      let top = document.getElementsByClassName('right-side')[0].scrollTop
      if (top < 300) {
        this.type = 1
      } else if (top >= 300 && top < 600) {
        this.type = 2
      } else if (top >= 600 && top < 840) {
        this.type = 3
      } else if (top >= 840 && top < 901) {
        this.type = 4
      }
    },
    toDetail: function () {
      this.$router.push({ path: '/detail' })
    }
  },
  components: {
    Header
  },
  created () {
    this.$http.get('/api/category').then((data) => {
      this.typeList = data.body.data[0].type
      this.itemList = data.body.data[0].item
      for (let i = 0; i < this.itemList.length; i++) {
        this.itemList[i].list = utils.reSrc(this.itemList[i].list, 'png')
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Category.scss";
</style>

<template>
  <div class="slider" @mouseover="clearInv" @mouseout="runInv">
    <div class="slider-img">
      <a href="#">
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].img">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].img">
        </transition>
      </a>
    </div>
    <h2>{{slides[nowIndex].title}}</h2>
    <ul class="slides-pages">
      <li class="prev" @click="goto(prevIndex)">&lt;</li>
      <li class="radius" :class="{active: index === nowIndex }" v-for="(item,index) in slides" :key="index" @click="goto(index)">
      </li>
      <li class="next" @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    slides: {
      type: Array,
      default: function () {
        return [
          {
            'title': '111',
            'img': require('@/assets/slider1.jpg'),
            'href': '/'
          }
        ]
      }
    },
    inv: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true
    }
  },
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      } else {
        return this.nowIndex - 1
      }
    },
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      } else {
        return this.nowIndex + 1
      }
    }
  },
  methods: {
    goto (index) {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
        this.nowIndex = index
      }, 10)
    },
    runInv () {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex)
      }, this.inv)
    },
    clearInv () {
      clearInterval(this.invId)
    }
  },
  mounted () {
    this.runInv()
  }
}
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>

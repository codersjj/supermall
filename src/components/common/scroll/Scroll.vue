<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1. 创建 BScroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, // 设置为 true 后，才能监听到 div 之类的元素（而不是用来限制 button 上的原生 click 事件）上的原生 click 事件
      observeDOM: true, // 开启 observe-dom 插件
      probeType: this.probeType, // 通过设置 probeType 配置项的值，决定要不要派发（监听）滚动事件
      pullUpLoad: this.pullUpLoad // 是否开启上拉加载功能
    })
    // console.log(this.scroll);

    // 2. 监听滚动的位置
    this.scroll.on('scroll', position => {
      // console.log(position);
      this.$emit('scroll', position)
    })

    if (this.pullUpLoad) {
      // 3. 监听上拉事件
      this.scroll.on('pullingUp', () => {
        console.log('pullingUp');
        this.$emit('pullingUp')
      })

    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      if (this.pullUpLoad) {
        this.scroll.finishPullUp()
      }
    }
  }
}
</script>

<style scoped>

</style>
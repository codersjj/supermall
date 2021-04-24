<template>
  <swiper>
    <swiper-item :key="item.acm" v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoaded: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      // console.log('轮播图加载完一张');
      if (!this.isLoaded) {
        // console.log('已加载完一张轮播图');
        this.$emit('swiperImageLoad')
        this.isLoaded = true
      }
    }
  }
}
</script>

<style>

</style>
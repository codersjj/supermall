import { debounce } from './utils'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 使用防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoaded', this.itemImgListener)
    console.log('我是混入中的内容');
  }
}
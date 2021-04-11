<template>
  <div class="goods">
    <goods-list-item
     :key="item.acm"
     v-for="item in goods" 
     :goods-item="item"
    />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around;
  padding: 3px; */
  justify-content: space-evenly;
}
</style>
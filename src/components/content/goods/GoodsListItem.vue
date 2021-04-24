<template>
  <div class="goods-item" @click="itemClick">
    <!-- 
      使用 Vue 提供的 load 事件监听每一张图片是否加载完成，一旦图片加载完就会执行 load 对应的方法（这里即 imageLoaded），
      再在 load 事件对应的方法中执行 BetterScroll 的 refresh 方法，重新计算可滚动的高度。
      @load 实现的是 js 原生的 GlobalEventHandlers.onload 属性这一事件处理程序（这里即 img.onload = function() {}）
    -->
    <img :src="goodsItem.show.img" alt="" @load="imageLoaded">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoaded() {
      console.log('imageLoaded');
      // 使用事件总线发出事件
      this.$bus.$emit('itemImageLoaded')
    },
    itemClick() {
      // console.log('详情');
      this.$router.push(`/detail/${this.goodsItem.iid}`)
    }
  }
}
</script>

<style scoped>
.goods-item {
  position: relative;
  padding-bottom: 40px;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  /* overflow: hidden; */
  text-align: center;
  font-size: 12px;
}

.goods-info p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}

.goods-info .price {
  margin-right: 20px;
  color: var(--color-high-text);
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  /* display: inline-block; */
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>
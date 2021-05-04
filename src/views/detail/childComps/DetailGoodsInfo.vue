<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div v-for="(item, index) in detailInfo.detailImage" :key="index">
      <div class="info-key">{{item.key}}</div>
      <div class="info-list">
        <img v-for="(item, index) in item.list"
            :src="item"
            alt="" 
            :key="index"
            @load="imgLoaded">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsInfo',
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        counter: 0,
        imagesCount: 0
      }
    },
    methods: {
      imgLoaded() {
        // 等到所有图片加载完时，再发送一次回调即可
        // if (++this.counter === this.detailInfo.detailImage[0].list.length) {
        if (++this.counter === this.imagesCount) {
          console.log('imgLoaded');
          this.$emit('imgLoaded')
        }
      }
    },
    watch: {
      // 监听 detailInfo 的变化
      detailInfo() {
        // 获取图片的个数
        this.detailInfo.detailImage.forEach(item => {
          this.imagesCount += item.list.length
        });
        // this.imagesCount = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    /* position: relative;
    display: inline-block;
    top: -12.8px; */
    position: absolute;
    top: 0;
    width: 5px;
    height: 5px;
    background-color: #333;
  }

  .info-desc .end::after {
    /* right: -86.8px; */
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    /* padding: 15px; */
    font-size: 15px;
    color: #333;
  }

  .info-list img {
    width: 100%;
  }
</style>
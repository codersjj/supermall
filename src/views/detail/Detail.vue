<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <!-- better-scroll 的父容器必须有固定的高度 -->
    <scroll class="detail-content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoaded="imgLoaded" />
      <detail-param-info :param-info="paramInfo" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import Scroll from 'components/common/scroll/Scroll'
import { getDetail, Goods, Shop, GoodsParam } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      // goods: null
      goods: {}, // 商品信息对象
      shop: {}, // 店铺信息对象
      detailInfo: {},
      paramInfo: {}
    }
  },
  created() {
    // this.iid = this.$route.params.iid
    
    // 1. 保存传入的 iid
    this.iid = this.$route.params.iid

    // 2. 根据 iid 请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const result = res.result;
      // 1. 获取顶部的图片轮播数据
      this.topImages = result.itemInfo.topImages

      // 2. 获取商品信息
      this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services)

      // 3. 获取店铺信息
      this.shop = new Shop(result.shopInfo)

      // 4. 获取商品详情信息
      this.detailInfo = result.detailInfo

      // 5. 获取参数信息
      this.paramInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule)
    })
  },
  activated() {
    /* // 1. 保存传入的 iid
    this.iid = this.$route.params.iid

    // 2. 根据 iid 请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      // 获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages
    }) */
  },
  methods: {
    imgLoaded() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail-content {
    /* 这里的 100% 是相对于父元素而言的（MDN: height：Percentages：The percentage is calculated with respect to the height of the generated box's containing block.） */
    height: calc(100% - 44px);
  }
</style>
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"
                 class="tab-control1"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoaded"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control2"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
                   :class="{'tab-fixed': isTabFixed}"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <!-- 使用 .native 修饰符监听组件的点击事件（直接监听组件根元素上的原生事件。不加 .native 是监听不到组件上的原生事件的） -->
    <back-top v-show="isShowBackToTop" @click.native="backToTop"/>

    <!-- <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
      <li>列表51</li>
      <li>列表52</li>
      <li>列表53</li>
      <li>列表54</li>
      <li>列表55</li>
      <li>列表56</li>
      <li>列表57</li>
      <li>列表58</li>
      <li>列表59</li>
      <li>列表60</li>
      <li>列表61</li>
      <li>列表62</li>
      <li>列表63</li>
      <li>列表64</li>
      <li>列表65</li>
      <li>列表66</li>
      <li>列表67</li>
      <li>列表68</li>
      <li>列表69</li>
      <li>列表70</li>
      <li>列表71</li>
      <li>列表72</li>
      <li>列表73</li>
      <li>列表74</li>
      <li>列表75</li>
      <li>列表76</li>
      <li>列表77</li>
      <li>列表78</li>
      <li>列表79</li>
      <li>列表80</li>
      <li>列表81</li>
      <li>列表82</li>
      <li>列表83</li>
      <li>列表84</li>
      <li>列表85</li>
      <li>列表86</li>
      <li>列表87</li>
      <li>列表88</li>
      <li>列表89</li>
      <li>列表90</li>
      <li>列表91</li>
      <li>列表92</li>
      <li>列表93</li>
      <li>列表94</li>
      <li>列表95</li>
      <li>列表96</li>
      <li>列表97</li>
      <li>列表98</li>
      <li>列表99</li>
      <li>列表100</li>
    </ul> -->
  </div>
</template>

<script>
/* 公共组件 */
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

/* 子组件 */
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

/* 方法等其它内容 */
import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'
import { itemListenerMixin } from 'common/mixin'

export default {
  components: {
    /* 建议：编写顺序和上面的导入顺序尽量一致 */
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentType: 'pop',
      isShowBackToTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      // itemImgListener: null
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // console.log('created');
    // 1. 请求多个数据
    this.getHomeMultidata()

    // 2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // console.log(this.$refs.scroll);
  },
  mounted() {
    // console.log('mounted');
    // console.log(this.$refs.scroll);
    // 1. 通过事件总线，监听 GoodsListItem 中图片加载完成
    // 注意：建议在 mounted() 中监听，而不是在 created() 中监听，以保证 this.$refs.scroll 一定是有值的。因为在 created() 中，this.$refs.scroll 还是 undefined（这里因为使用的是回调函数，所以有可能为空，也有可能不为空）
    /* this.$bus.$on('itemImageLoaded', () => {
      // console.log(this.$refs.scroll);
      // 执行 BetterScroll 的 refresh 方法，重新计算可滚动的高度。
      this.$refs.scroll && this.$refs.scroll.refresh()
    }) */
    /* // 使用防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    // 对监听到事件后要执行的函数进行保存
    this.itemImgListener = () => {
      // console.log('---');
      refresh()
    }
    this.$bus.$on('itemImageLoaded', this.itemImgListener) */
    /* const that = this
    this.$bus.$on('itemImageLoaded', function () {
      // 执行 BetterScroll 的 refresh 方法，重新计算可滚动的高度。
      that.$refs.scroll.refresh()
    }) */
  },
  destroyed() {
    console.log('destoryed');
  },
  activated() {
    console.log('activated');
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // this.$refs.scroll.refresh()
  },
  deactivated() {
    console.log('deactivated', this.$refs.scroll.getScrollY());
    // 1. 离开首页时，保存当前位置（y轴坐标）
    this.saveY = this.$refs.scroll.getScrollY()
    // 2. 离开首页时，取消全局事件的监听
    // this.$bus.$off('itemImageLoaded') // 只传事件名称会将所有地方的这个事件监听都取消掉
    // 我们这里只需要取消掉和这个事件关联的某一个函数就可以了
    this.$bus.$off('itemImageLoaded', this.itemImgListener)
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1: 
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backToTop() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      // console.log(position);
      // 判断 BackTop 是否显示
      this.isShowBackToTop = -position.y > 1000

      // 决定 TabControl 是否吸顶（position: fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    loadMore() {
      // console.log('加载更多');
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoaded() {
      console.log('收到消息：已加载完一张轮播图');
      // 获取 TabControl 的 offsetTop
      // 所有组件都有一个属性 $el，用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        /* for (const item of res.data.list) {
          this.goods[type].list.push(item)
        } */
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++

        // 结束上拉加载行为，告诉 BetterScroll 准备好下一次的 pullingUp 钩子。
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

// 注意：样式要加 scoped，否则可能出现样式污染问题
<style scoped>
  #home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh; /* vh -> viewport height */
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 6; */
  }

  /* .tab-control2 {
    position: sticky;
    top: 44px;
    z-index: 6;
  } */

  /* 方案一：动态计算 */
  /* .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    margin-top: 44px;
  } */

  /* 方案二：定位 */
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .tab-fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */

  .tab-control1 {
    position: relative;
    z-index: 9;
  }
</style>
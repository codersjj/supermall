<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
    <!-- <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot> -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- 在插槽中添加样式是没有效果的，因为插槽最后会被替换掉，因此样式也会丢失 -->
    <!-- <slot :class="{ active: isActive }" name="item-text"></slot> -->
    <!-- 通常会在插槽外面包一层 div，以便添加样式等内容 -->
    <!-- <div :class="{ active: isActive }">
      <slot name="item-text"></slot>
    </div> -->
    <!-- <div :style="isActive ? { color: activeColor } : {}">
      <slot name="item-text"></slot>
    </div> -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      // /home  -> item(/home) = true
      // /home  -> item(/category) = false
      // /home  -> item(/cart) = false
      // /home  -> item(/profile) = false
      return this.$route.path.indexOf(this.link) !== -1
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick() {
      // console.log('itemClick');
      // 使用 push 可以使浏览器返回按钮有效
      // this.$router.push(this.link)
      // 使用 replace 可以使浏览器返回按钮失效
      this.$router.replace(this.link)
    }
  }
}
</script>

<style>
  .tab-bar-item {
    flex: 1;
    /* 移动端开发中，tabbar 的高度通常设为 49px */
    height: 49px;
    text-align: center;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }

  .active {
    color: red;
  }
</style>
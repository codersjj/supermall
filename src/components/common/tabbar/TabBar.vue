<template>
  <div id="tab-bar">
    <!-- <div class="tab-bar-item">
      <img src="../../assets/img/tabbar/home.svg" alt="">
      <div>首页</div>
    </div>
    <div class="tab-bar-item">
      <img src="../../assets/img/tabbar/home.svg" alt="">
      <div>分类</div>
    </div>
    <div class="tab-bar-item">
      <img src="../../assets/img/tabbar/home.svg" alt="">
      <div>购物车</div>
    </div>
    <div class="tab-bar-item">
      <img src="../../assets/img/tabbar/home.svg" alt="">
      <div>我的</div>
    </div> -->
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
  #tab-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    
    background-color: #f6f6f6;
    box-shadow: 0 -1px 1px rgba(100, 100, 100, .1);
  }
</style>
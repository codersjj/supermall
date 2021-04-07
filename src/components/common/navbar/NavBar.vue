<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .nav-bar {
    display: flex;
    /* 导航栏的高度一般设置为 44px，如果在加上状态栏（高度一般设置为 20px），高度就设置为 64px */
    height: 44px;
    line-height: 44px;
    /* background-color: #f06; */
    text-align: center;
    box-shadow: 0px 1px 1px 1px rgba(100, 100, 100, .1);
  }

  .left, .right {
    width: 60px;
    /* background-color: #58a; */
    /* background-color: #fb3; */
  }

  .center {
    flex: 1;
  }
</style>
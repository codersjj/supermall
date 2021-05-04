<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :key="index" v-for="(item, index) in commentInfo.images" :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from 'common/utils'

  export default {
    name: 'DetailCommentInfo',
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      showDate(value) {
        // 1. 将时间戳转换为 Date 对象（时间戳单位是 m，而 Date 构造函数接收的参数是 ms 数，因此需要乘以 1000，将 m 转换为 ms）
        const date = new Date(value * 1000)
        // 2. 将 date 进行格式化
        return formatDate(date, 'yyyy/MM/dd hh:mm:ss')
      }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .info-user {
    /* display: flex;
    align-items: center; */
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    top: -15px;
    margin-left: 10px;
    font-size: 15px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    line-height: 1.5;
    font-size: 14px;
    color: #777;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 10px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
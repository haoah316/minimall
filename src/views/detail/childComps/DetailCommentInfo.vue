<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多</div>
      <i class="arrow-right"></i>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span> {{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <!-- 过滤器filter，服务其返回的时间是一串数字（以Unix时间元年为起点的秒数，返回对应的时间戳）而不是正常的格式，需要将时间错转化为时间格式字符串 -->
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils";

export default {
name: "DetailCommentInfo",
props:{
  commentInfo:{
    type:Object,
    default(){
      return {}
    }
  }
},
filters:{
  // 首先是将时间戳（秒）转换为Date对象，*1000转为毫秒
    showDate: function(value) {
    let date = new Date(value*1000);
    // 将Date进行格式化，转换为字符串，formate（date，'yyyy-MM-dd-HH/hh-mm-ss'），这里将这种常用的方法进行了封装
    return formatDate(date,'yyyy-MM-dd hh:mm')
  }
}
}
</script>

<style>
.comment-info{
  padding: 2px;
}
.info-header{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(192, 190, 190, 0.884);
}
.info-header .header-title{
  float: left;
  margin-left: 5px;
  font-size: 15px;
}
.info-header .header-more{
  float: right;
  font-size: 13px;
  margin-right: 5px;
}
.info-user{
  margin-top: 5px;
}
.info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

.info-user span {
  position: relative;
  font-size: 15px;
  top: -15px;
  margin-left: 10px;
}

.info-detail {
  padding: 0 5px 15px;
}

.info-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}

.info-detail .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}

.info-other .date {
  margin-right: 8px;
}
.info-imgs{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info-imgs img{
  height: 15vh;
  width: 15vw;
  margin: 0px 1vh;
}
</style>
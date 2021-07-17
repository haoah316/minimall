<template>
  <div class='bottom-bar'>
    <div class="bar-item bar-left">
      <div >
        <i class="icon talk"></i>
        <span class="text">客服</span>
      </div>
      <div >
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div >
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailBottomBar",
}
</script>

<style scoped>
.bottom-bar{
  height: 44px;
  background-color: rgb(250, 244, 244);

  position: relative;

  display: flex;
  text-align: center;
}
.bar-item{
  flex: 1;
  display: flex;
  bottom: 10px;
}
.bar-item>div{
  flex: 1;
}

.bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 2px auto;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.bar-left .talk{
  /* 精灵图：x,y 这里的x为0，左右不动；y为-54px， 向上移动54px*/
  background-position: 0 -54px;
}
.bar-left .shop{
  background-position: 0 -98px;
}
.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}

.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}

.bar-left .text{
  font-size: 12px;
  /* google浏览器设置小于12px字体 */
  -webkit-transform: scale(0.95);
  display: block;
}

.bar-right .buy {
  background-color: #f69;
}
</style>
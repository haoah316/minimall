<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">
      <span>{{goods.title}}</span>
    </div>
    <div class="info-price">
      <span class='n-price'>{{goods.newPrice}}</span>
      <span class='o-price'>{{goods.oldPrice}}</span>
      <span v-if='goods.discount' class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-columns">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
name: 'DetailBaseInfo',
props:{
  goods:{
    type:Object,
    defualt(){
      return {}
    }
  }
}
}
</script>

<style scoped>
.base-info{
  padding: 5px;
}
.info-title{
  font-size: 15px;
  color: black;
}
.info-price{
  margin-top: 5px;
}
.info-price .n-price{
  color: red;
  font-size: 18px;
  margin-right: 5px;
}
.info-price .o-price{
  font-size: 8px;
  text-decoration-line: line-through;
}
.info-price .discount{
  background-color: red;
  color: aliceblue;
  font-size: 8px;
  border-radius: 8px;
  margin-left: 5px;
  /* 让文字与边框有距离 */
  padding: 2px 5px;

  /* 让元素上浮一些 */
  position: relative;
  top: -5px;
}
.info-columns{
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  line-height: 30px;
  border-bottom: 1px solid rgba(37, 37, 37, 0.089);
}
.info-service{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
 
}
.info-service img{
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}
.info-service span{
  font-size: 12px;
   color: black;
}
</style>
<template>
  <div class="recommend-list">
    <div class="info-header">热门推荐</div>
    <grid-view>
      <div v-for="(item,index) in recommendList" :key="index" class="recommend-item">
      <img :src="item.image" alt="">
      <div class="recommend-info">
      <p>{{item.title}}</p>
      <span class="recommend-price">￥{{item.price}}</span>
      <span class="recommend-cfav">{{item.cfav}}</span>
      </div>
    </div>
    </grid-view>
    
    
  </div>
</template>

<script>
import GridView from 'components/common/gridView/GridView'
export default {
name:'DetailRecommendInfo',
components:{
  GridView,
},
props:{
  recommendList:{
    type:Array,
    defualt(){
      return []
    }
  }
}
}
</script>

<style>
.info-header{
  font-size: 20px;
}
.recommend-item{
  padding-bottom: 40px;
  position: relative;
  width: 48%;
  /* z-index: -1; */
}
.recommend-item img{
  border-radius: 5px;
  width:100%;
}
.recommend-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
}
.recommend-info p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2px;
}
.recommend-price{
  color:var(--color-high-text);
  /* float:left; */
  margin-right: 30px;
}

.recommend-cfav{
  position: relative;
}

.recommend-item .recommend-cfav::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
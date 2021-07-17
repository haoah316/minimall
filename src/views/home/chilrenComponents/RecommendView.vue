<template>
<div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommends" :key='index'>
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
</div>

</template>

<script>
export default {
  name: 'RecommendView',
  props:{
    recommends:{
      type: Array,
      defualt(){
        return []
      }
    }
  },
  components:{
  }
}
</script>

<style>
.recommend{
  display: flex;
  border-bottom: rgb(238, 222, 231) 15px solid;
}
.recommend-item{
  flex: 1;
  text-align: center;
  margin:10px 15px;
  font-size: 2px;
  color: rgb(243, 149, 204);
}
.recommend-item img{
  width: 100%;
}
</style>
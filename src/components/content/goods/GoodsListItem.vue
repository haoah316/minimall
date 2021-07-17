<template>
  <div class="goodslistitem" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goodsinfo">
      <p>{{goodsItem.title}}</p>
      <span class="goodsprice">￥{{goodsItem.price}}</span>
      <span class="goodscfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
name:'GoodsListItem',
props:{
  goodsItem:{
    type: Object,
    default(){
      return {}
    }
  }
},
computed:{
  showImage(){
    // 因为首页和详情页推荐展示的商品信息的命名方式不同，在共用一个组件进行数据展示时，要进行判断当前有值的那个然后展示
    return this.goodsItem.image || this.goodsItem.show.img
  }
},
methods:{
  imageLoad(){
    this.$bus.$emit('itemImageLoad')
  },
  itemClick(){
    // this.$router.push('/detail')
    this.$router.push('/detail/'+this.goodsItem.iid)
  }
}
}
</script>

<style>
.goodslistitem{
  padding-bottom: 40px;
  position: relative;
  width: 48%;
  /* z-index: -1; */
}
.goodslistitem img{
  border-radius: 5px;
  width:100%;
}
.goodsinfo{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
}
.goodsinfo p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2px;
}
.goodsprice{
  color:var(--color-high-text);
  /* float:left; */
  margin-right: 30px;
}

.goodscfav{
  position: relative;
}

.goodslistitem .goodscfav::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
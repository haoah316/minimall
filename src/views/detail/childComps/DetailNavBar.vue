<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in titles" :key="index" class="title-item" :class="{active:index === currentIndex}" @click="getIndex(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
name: "DetailNavBar",
components:{
  NavBar
},
props:{
  currentIndex:{
    type:Number,
    defualt: 0,
  }
},
data(){
  return {
    titles:['商品','参数','评论','推荐']
  }
},
methods:{
  getIndex(index){
    this.currentIndex = index;
    this.$emit('titleClick',index);
  },
  backClick(){
    // this.$router.go(-1)等同back
    // 利用路由回到上一页
    this.$router.back();
  },

}
}

</script>

<style>
.title{
  display: flex;
}
.title .title-item{
  flex: 1;
  font-size: 10px;
}
.active{
  color: red;
}
.back{
  padding-top: 5px;
}
</style>
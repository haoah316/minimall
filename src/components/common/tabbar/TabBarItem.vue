<template>
<div class="tabbar-item">
  <div v-if="isActive" @click="itemClick"><slot name="item-img"></slot></div>
  <div v-else><slot name="item-img-active"></slot></div>
  <div :style="activeStyle"><slot name="item-text"></slot></div>
  
</div>
  
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data(){
    return{
      //  isActive: true,
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path)
    },
    activeStyle(){
      return !this.isActive ? { color:this.activeColor} : {}
    }
  },
    methods: {
      itemClick(){
        this.$router.replace(this.path)
      }
  }
}
</script>

<style>
.tabbar-item{
  /* 设置四个div均分父div */
  flex: 1;
  text-align: center;
  height: 49px;  
  font-size: 15px;
}

.tabbar-item img{
  height: 20px;
  width: 20px;
  margin-top: 5px;
  vertical-align: center;
}

.active{
  color: red;
}
</style>
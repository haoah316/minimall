<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item" :key=index :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>

  </div>
</template>

<script>
  export default {
    name:'TabControl',
    props:{
      titles:{
        type:Array,
        defualt(){
          return []
        }
      }
    },
    data(){
        return{
          currentIndex: 0
        }
    },
    methods:{
     itemClick(index){
       this.currentIndex = index;
       this.$emit('tabClick',index);
      }
    }
  }
</script>

<style>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 10px;
  z-index: 9;
}
.tab-control-item{
  flex: 1;
  line-height: 40px;
  height: 40px;

}
.active{
  color: var(--color-high-text);
}
.active span{
   border-bottom: var(--color-high-text) solid 2px;
}
</style>
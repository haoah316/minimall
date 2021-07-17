<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <!-- 不进行destroy，保存每个组件的浏览状态，下次返回还会返回某个页面上次浏览位置，但是better-scroll中会存在一些问题，后面还要以完全实现保存浏览位置 -->
    <!-- Detail页面不需要作状态保存  -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
   
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'

export default{
  name: 'app',
  components:{
    MainTabBar
  }
  
}
</script>

<style scoped>
@import 'assets/css/base.css'
</style>


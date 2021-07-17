<template>
  <swiper>
       <swiper-item v-for="item in banners">
         <!-- 别忽略动态绑定，否则显示不出来 -->
         <a :href="item.link">
           <img :src="item.image" alt="" @load="imageLoad">
         </a>
       </swiper-item>
     </swiper>
</template>

<script>
// 使用了index.js文件统一导出
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
name: 'HomeSwiper',
// 父向子传参数
props:{
  banners:{
    type: Array,
    default(){
      return []
    }
  }
},
data(){
  return{
     isLoad: false
  }
 
},
components:{
    Swiper,
    SwiperItem
  },
methods:{
  imageLoad(){
    // isLoad记录图片是否加载，已经加载了，其他图片再加载时就不需要继续发出了
    if(!this.isLoad){
      this.$emit('swiperImageLoad')
      this.isLoad = true
    }
    
  }
}
}
</script>

<style>

</style>
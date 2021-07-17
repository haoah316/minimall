<template>
  <div id="home">
    <nav-bar class="home-nav">
     <div slot='center'>购物街</div>
    </nav-bar>
    <!-- “掩耳盗铃”，上面定义一个同样的tabbar，一开始隐藏，与下面的tabbar滑动到相遇的位置时显示，替换到向上滑走而不显示在页面里的原来tabbar，巧妙实现tabbar吸顶效果 -->
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick='tabClick' ref="tabControl1" :class="{fixed:isTabFixed}" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
           :pull-up-load="true" @pullingUp="loadMore">
    <!-- 父子组件通信，动态绑定数据 -->
    <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']"  @tabClick='tabClick' ref="tabControl2" :class="{fixed:isTabFixed}"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 原生标签监听点击使用click就可，但是组件要想监听原生的点击时间需要在click后面加上.native修饰符 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import HomeSwiper from './chilrenComponents/HomeSwiper'
import RecommendView from './chilrenComponents/RecommendView'
import FeatureView from './chilrenComponents/FeatureView'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

// 这里加了{}，是因为导出的时候没有defualt
import {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
  name: 'home',
  data(){
    return{
      banners : [],
      recommends: [],
      goods:{
        'pop':{page: 0,list:[]},
        'new':{page: 0,list:[]},
        'sell':{page: 0,list:[]}
      },
      currentType: 'pop',
      isShow: false,
      pullUp: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list;
    }
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  // 请求服务器多个数据
  created(){
    this.getHomeMultidata()
  // 请求服务器多个商品数据(流行，新款，热卖)
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  
  },
  mounted(){
  // 1-1.监听item中图片加载完成,每张图片加载完成后自动刷新获取正确的scrollHeight，解决卡顿问题
    // this.$bus.$on('itemImageLoad',()=>{
    //   // console.log(this.$refs.scroll.refresh);
    //   this.$refs.scroll.refresh()
    // })
    //1-2. 防抖优化，只在规定时间内刷新，而不是每张图片加载完成后都刷新
    const refresh = this.debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })
  },
  destroyed(){
    console.log('destroyed');
  },
  activated(){
    // console.log('activated');
    // 获取deactivated的保存位置，利用scroll迅速回位
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated(){
    // console.log('deactivated');
    // 获取并保存当前离开时的Y值，让下次当前组件处于activated时回到这个位置
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY);
  },
  methods:{
    // 网络请求相关方法
    tabClick(index){
      // console.log(1);
      switch(index){
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
   
    // 事件监听相关方法
    debounce(func,delay){
      let timer = null
      return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
    },

    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      // console.log(res)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },
    getHomeGoods(type){
      
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
      // console.log(res)
      // ...ES6扩展运算符，将数组中的每个元素依次传入
      this.goods[type].list.push(...res.data.list)
      // 获取下一page的数据，为上拉加载做准备
      this.goods[type].page += 1

      // 完成上拉加载更多
      this.$refs.scroll.finishPullUp()
      // 解决scroll预先计算滚动高度后导致后续图片加载卡顿的bug，刷新让scroll重新计算滚动高度
      // this.$refs.scroll.scroll.refresh()
      
    })
    },
    backClick(){
      // 调用scroll对象，scroll(x,y,time)
      this.$refs.scroll.scrollTo(0,0,500);
    },
    contentScroll(position){
      //1.判断BackTop是否显示
      this.isShow = (-position.y) > 1000

      //2.fixed的值来决定tabcontol是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 上拉加载更多
    loadMore(){
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad(){
      // console.log(this.$refs.tabControl.$el.offsetTop); 
      // 2.获取tabControl的tabOffsetTop
      // 所有组件都有属性$el:用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.tabOffsetTop)
    },
    
  }
}
</script>

<style scoped>
/* scoped 只在当前文件作用域内有效 */
#home{
  /* padding-top: 40px; */
  /* vh 视口百分比 */
  height: 100vh;
}
.home-nav{
  background-color:hotpink;
  color: aliceblue;
  font-size: 15px;
  
/* 原生滚动，让导航栏不随着页面滚动 */
  /* position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1; */
}

.tab-control{
  position: relative;
  z-index: 1;
  background-color: rgb(255, 255, 255);
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.fixed{
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
}
/* .content{
  height: calc(100% - 49px);
  overflow: hidden;
 
} */
  
</style>
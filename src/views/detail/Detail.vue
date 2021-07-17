<template>
  <div id="detail" >
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" :currentIndex="currentIndex"/>
    <!--动态绑定probeType="3"，这样就会滚动实时监听  -->
    <scroll class="content" :probe-type="3" @scroll = "contentScroll" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>/
      <detail-param-info ref="params" :param-info="paramInfo"/>/
      <detail-comment-info ref="comments" :comment-info="commentInfo"/>
      <!-- 这是使用了新封装的组件进行推荐展示，里面使用了另外的组件对商品数据做两栏布局展示 -->
      <!-- <detail-recommend-info :recommend-list="recommendList"></detail-recommend-info> -->
      <!-- 使用原来首页中使用的goodlist组件进行数据展示，因为首页也是两栏展示，基本数据信息一致，所以可以进行复用 -->
      <good-list ref="recommends" :goods="recommendList"/>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommendInfo from './childComps/DetailRecommendInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodList from 'components/content/goods/GoodsList'

import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'

import Scroll from 'components/common/scroll/Scroll'

export default {
name:'Detail',
components:{
  DetailNavBar,
  DetailSwiper,
  DetailBaseInfo,
  DetailShopInfo,
  DetailGoodsInfo,
  DetailParamInfo,
  DetailCommentInfo,
  DetailRecommendInfo,
  DetailBottomBar,
  Scroll,
  GoodList,
},
data() {
  return {
    iid: '',
    topImages: [],
    goods:{},
    shop:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommendList:[],
    themeToY:[],
    currentIndex: 0,
  }
},
methods:{
    // 父子组件通信，子组件图片加载完成，刷新该网页
    imageLoad(str){
      this.$ref.scroll.refresh();
    },
    titleClick(index){

     
      // console.log(index);
      console.log(this.themeToY);
      this.$refs.scroll.scrollTo(0, -this.themeToY[index], 100);
    
    },
    contentScroll(position){
      // console.log(position);

      // 获取Y值
      const positionY = -position.y
      // 监听位置并改变NavBar的状态
     this._listenScrollTheme(-position.y)
    },
      _listenScrollTheme(position) {
        let length = this.themeToY.length;
        for (let i = 0; i < length; i++) {
          let iPos = this.themeToY[i];
          /**
           * 判断的方案:
           *  方案一:
           *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
           *    优点: 不需要引入其他的内容, 通过逻辑解决
           *    缺点: 判断条件过长, 并且不容易理解
           *  方案二:
           *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
           *    优点: 简洁明了, 便于理解
           *    缺点: 需要引入一个较大的int数字
           * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
           * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
           */
          if (position >= iPos && position < this.themeToY[i+1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i;
            }
            break;
          }
        }
      },
      
  },
created(){
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
          // 1.获取顶部的图片轮播数据
          console.log(res);
          const data = res.result;
          this.topImages = data.itemInfo.topImages;

          // 2.获取商品基本信息
          // console.log(data);
          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

          // 3.获取店铺信息
          this.shop = new Shop(data.shopInfo)

          // 4.获取商品详细信息
          this.detailInfo = data.detailInfo

          // 5.获取商品参数
          this.paramInfo = new GoodsParam(data.itemParams)

          // 6.获取商品评论
          this.commentInfo = data.rate.list[0]
      
    })
    getRecommend().then((res,error)=>{
      if(error) return
      this.recommendList = res.data.list
    })
  },
mounted(){
},
updated(){
   // 使用数组对详情页上部四个选项指定跳转位置
      // 这段代码，在created中元素元素还没渲染；在mounted中DOM创建了，但是还没有完全渲染，如图片没完全加载；updated里面会执行多次
      this.themeToY = [];
      this.themeToY.push(0);
      this.themeToY.push(this.$refs.params.$el.offsetTop);
      this.themeToY.push(this.$refs.comments.$el.offsetTop);
      this.themeToY.push(this.$refs.recommends.$el.offsetTop);
      this.themeToY.push(Number.MAX_VALUE)

},
}
</script>

<style scoped>
#detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }

.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 44px);
}

</style>
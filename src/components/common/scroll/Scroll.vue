<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props:{
    probeType:{
      type: Number,
      default:0
    },
    pullUpLoad:{
      type: Boolean,
      default: false
    }

  },
  data(){
    return {
      scroll: null
    }
  },
  mounted(){
    // 1.创建BScroll对象
    // vue不建议通过class直接操作dom(因为会和其他文件里同名的class混淆),可以通过元素或组件上绑定的ref获取某个元素或组件
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      // probeType 0,什么都不监听,1,非实时监听,2,屏幕手指滑动时，实时监听,3,不仅在屏幕手指滑动过程中而且在其他滚动（如惯性）过程中都实时监听
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    })

    // 2.监听滚动位置
    if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position)=>{
        // console.log(position);
        // 自定义事件,实时将事件发送到home.vue，向父组件传值
        this.$emit('scroll',position)
      })
    }

    // 3.监听上拉加载事件
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
    // this.scroll.scrollTop(0,0)
  },
  methods:{
    scrollTo(x,y,time){
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      // 显示refresh调用几次，验证防抖功能
      // console.log('1111111');
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll? this.scroll.y:0
    }
  }

}
</script>

<style>

</style>
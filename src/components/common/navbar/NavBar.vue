<template>
  <div class="nav-bar">
    <div class='left'><slot name="left"></slot></div>
    <div class='center'><slot name="center"></slot></div>
    <div class='right'><slot name="right"></slot></div>
  </div>
</template>

<script>

export default {
  name:'NavBar'

}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    box-shadow: 0 1px 1px rgb(236, 232, 232,1);
    text-align: center;
  }
  .left,.right{
    width: 60px;
    /* background-color:rgb(224, 210, 217); */
  }
  .center{
    flex: 1;
    
  }

</style>
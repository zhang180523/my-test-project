<template>
  <div class="order">
    <div class="head">
      <router-link to="/home"><i class="iconfont icon-fanhui"></i></router-link>
      <span>订单</span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
  data(){
    return{

    }
  },
  created() {

  }
}
</script>

<style scoped lang="less">
.head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(0, 146, 232);
  height: 50px;
span{
  font-size: 1.1rem;
}
color: rgb(255, 255, 255);
a{
  color: rgb(255,255,255);
  font-size: 1.2rem;
}
padding: 0px 10px 0px 10px;
  span:nth-child(2){
    font-weight: 800;
    font-size: 1.5rem;
  }
}
@import "http://at.alicdn.com/t/font_2878927_sfpv27mmxrc.css";
</style>
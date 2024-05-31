<template>
  <div class="forget">
    <div class="head">
      <router-link to="/login"><i class="iconfont icon-fanhui"></i></router-link>
      <span>重置密码</span>
      <span></span>
    </div>
    <div class="big">
      <div class="div1">
        <input type="text" placeholder="账号">
        <input type="text" placeholder="旧密码">
        <input type="text" placeholder="请输入新密码">
        <input type="text" placeholder="请确认密码">
        <input type="text" placeholder="验证码">
      </div>
    </div>
    <input type="submit" value="登录" id="input1">
  </div>
</template>

<script>
export default {
  name: "login",

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
  span:nth-child(2) {
    font-weight: 800;
    font-size: 1.5rem;
  }
}
.big{
  background-color: #f5f5f5;
}
.div1{
  margin-top: 1rem;
  input{
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #f1f1f1;
    outline: none;
  }
}
#input1{
  background-color: #00dc6e;
  padding: 0.5rem;
  width: 90%;
  margin-left: 20px;
  border-radius: 0.6rem;
  color: white;
  font-size: 1.4rem;
  border: none;
}
@import "http://at.alicdn.com/t/font_2878927_1k61276fcum.css";
</style>
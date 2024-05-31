<template>
  <div class="headers">
    <span class="left"><slot name="left"></slot></span>
    <span class="min"><slot name="min"></slot></span>
    <span class="right"><slot name="right"></slot></span>
  </div>
</template>

<script>
export default {
  name: "headers"
}
</script>

<style scoped lang="less">
.headers{
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
</style>

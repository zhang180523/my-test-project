<template>
  <div class="home">
    <div class="head">
      <span>ele.me</span>
      <router-link to="/login">登录|注册</router-link>
    </div>
    <div class="location">
      <div id="up">
        <span>当前定位城市是：</span>
        <span>定位不准确时，请在城市列表中选择</span>
      </div>
      <router-link :to="{name:'city',params:{id:32}}" id="down">
        <span>郑州</span><i class="iconfont icon-youjiantou"></i>
      </router-link>
    </div>
    <div class="hot_city">
      <h4>热门城市</h4>
      <ul>
        <li v-for="(v,i) in hot" :key="i">
        <router-link :to="{name:'city',params:{id:v.id}}">
        {{v.name}}
        </router-link>
        </li>
      </ul>
    </div>
    <div class="group" v-for="(v,i) in letter" :key="i">
      <h4>{{ v }}</h4>
      <ul>
        <li v-for="(value,index) in group[i][1]" :key="index">
          <router-link :to="{name:'city',params:{id:value.id}}">{{value.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {

  },
  data(){
    return {
      hot:[],
      group:[],
      letter:[],
    }
  },
  created() {
    /*this.axios.get('/v1/cities?type=guess').then(data=>{
      console.log(data.data)
      // this.guess = data.data;
    });*/
    this.axios.get('/v1/cities?type=hot').then(data=>{
      // console.log(data.data)
      this.hot = data.data;
    });
    this.axios.get('/v1/cities?type=group').then(data=>{
      // console.log(data.data)
      this.letter = Object.keys(data.data).sort();
      this.group = Object.entries(data.data).sort();
      // console.log(this.letter,this.group)
    });
  },
};
</script>
<style lang="less" scoped>
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
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.location{
  margin: 10px 0px 10px 0px;
}
#up{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px 0px 10px;
  span:nth-child(1){
    font-size: 0.8rem;
  }
  span:nth-child(2){
    font-size: 0.6rem;
    font-weight: 800;
  }
  height: 2rem;
}
#down{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.6rem 0 0.6rem;
  height: 3rem;
  span{
    color: rgb(139, 144, 232);
    font-size: 1.2rem;
  }
}
.hot_city{
  margin-bottom: 10px;
  h4{
    text-align: left;
    font-size: 0.8rem;
    color: rgb(126, 126, 180);
    height: 2rem;
  }
  li{
    border: 1px solid rgb(228, 228, 228);
    display: inline-block;
    width: 24.5%;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    a{
      color: rgb(0, 146, 232);
    }
  }
}
.group{
  margin-bottom: 10px;
  h4{
    text-align: left;
    font-size: 0.8rem;
    color: rgb(126, 126, 180);
    height: 2rem;
  }
  li{
    border: 1px solid rgb(228, 228, 228);
    display: inline-block;
    width: 24.5%;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    a{
      color: black;
    }
  }
}
@import "http://at.alicdn.com/t/font_2878927_u8901v559g.css";
</style>

<template>
  <div class="search">
    <div class="head">
      <router-link :to="{path:'/www/msite',query:{geohash:this.qqq}}"><i class="iconfont icon-fanhui"></i></router-link>
      <span>搜索</span>
      <span></span>
    </div>
    <div id="div1">
      <input type="text" placeholder="请输入商家或者美食名称" v-model="content">
      <input type="submit" @click="sew">
    </div>
    <section id="section1">
      <h4>{{isshow ? '搜索历史' : '商家'}}</h4>
      <ul v-if="!isshow">
        <li v-for="(v,i) in search2" :key="i" class="li1">
          <section>
            <img :src='"https://elm.cangdu.org/img/"+v.image_path' alt="">
          </section>
          <section>
            <p>{{v.name}}<span>支付</span></p>
            <p>月售{{v.recent_order_num}}单</p>
            <p>20元起送/距离{{v.distance}}</p>
          </section>
        </li>
      </ul>
      <ul v-if="!isshow">
        <li v-for="v in history" :key="v" class="li2">
          <span>{{v}}</span>
          <span><i class="iconfont icon-cuowuhaoma"></i></span>
        </li>
        <li id="li3" @click="eliminate">清空搜索历史</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "search",
  data(){
    return{
      active:0,
      qqq:'',
      content:'',
      geohash:'',
      search2:[],
      isshow:true,
      history:[],
    }
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("historyList"))) {
      this.history = JSON.parse(localStorage.getItem("historyList"));
    }
  },
  methods:{
    sew(){
      this.axios.get('/v4/restaurants',{params:{geohash:this.geohash,keyword:this.content}}).then(data=>{
        console.log(data.data);
        this.search2 = data.data;
      })
      this.isshow = false;
      if(this.content != ''){
        var newArr = [];
        newArr.push(this.content);
        this.history = newArr;
        console.log(this.history)
      }
      var storage = window.localStorage;
      storage.history = this.history;
      console.log(this.history,typeof this.history)
    },
    eliminate(){
        localStorage.removeItem('historyList');
    }
  },
  created() {
    this.geohash = this.$route.query.geohash;
    console.log(this.geohash)
    var storage = window.localStorage;
    this.qqq =  storage.a;
    this.history = storage.history;
    // this.history = this.history.splice(',');
    console.log(this.history)
  },
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
#div1{
  padding: 0.8rem;
  height: 36px;
  input{
    height: 100%;
  }
  input:nth-child(1){
    width: 79%;
    border: 1px solid #e4e4e4;
    background-color: #f2f2f2;
    outline: none;
  }
  input::-webkit-input-placeholder{  // 针对 谷歌 内核
    font-weight:600;
    color: #757575;
    line-height:40px;
  }
  input:nth-child(2){
    width: 18%;
    border: none;
    margin-left: 0.3rem;
    background-color: #0092e8;
    color: white;
    border-radius: 0.4rem;
  }
}
#section1{
  h4{
    margin-bottom: 0.8rem;
    color: #666;
  }
}
.li1{
  display: flex;
  justify-content: center;
  padding: 0.4rem;
  background-color: #f5f5f5;
  section:nth-child(1){
    width: 12%;
    img{
      width: 44px;
      height: 44px;
      text-align: center;
    }
  }
  section:nth-child(2){
    width: 80%;
    p{
      margin-top: 0.4rem;
      span{
        color: red;
        border-radius: 0.4rem;
        font-size: 0.7rem;
        border: 1px solid red;
        margin-left: 0.4rem;
      }
    }
  }
}
.li2{
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  padding: 0px 0.7rem 0px 0.4rem;
  height: 51px;
  line-height: 51px;
  span:nth-child(1){
    width: 80%;
    font-size: 1.2rem;
  }
  span:nth-child(2){
    width: 5%;
  }
}
#li3{
  background-color: #f5f5f5;
  height: 51px;
  text-align: center;
  line-height: 51px;
  font-size: 1.2rem;
  color: #0092e8;
  font-weight: 800;
}
@import "http://at.alicdn.com/t/font_2878927_tuj3fw9i42.css";
</style>
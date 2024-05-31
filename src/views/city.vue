<template>
    <div class="city">
      <div class="head">
        <router-link to="/home"><i class="iconfont icon-fanhui"></i></router-link>
        <span>{{city}}</span>
        <router-link to="/home">切换城市</router-link>
      </div>
      <div class="www">
        <div class="search">
          <input type="text" placeholder="输入学校、商务楼、地址" v-model="content"><br>
          <input type="submit" value="提交" @click="sew">
        </div>
      </div>
      <p id="p1">搜索历史</p>
      <ul id="ul1">
        <li v-for="(v,i) in search" :key="i" @click="preservation(v)">
          <h4>{{v.name}}</h4>
          <p>{{v.address}}</p>
        </li>
      </ul>
      <ul id="ul2" v-if="isShow">
        <li v-for="(v,i) in hist" :key="i" class="his">
          <p>{{v.name}}</p><span><i class="iconfont icon-cuowuhaoma" @click="delete1(i)"></i></span>
        </li>
        <p @click="eliminate">清空所有</p>
      </ul>
    </div>
</template>

<script>
export default {
  name: "city",
  data(){
    return{
      num:'',
      city:'',
      content:'',
      search:[],
      isShow:true,
      hist:[],
    }
  },
  methods:{
    sew(){
      console.log(this.content,this.num)
      this.axios.get('/v1/pois',{params:
            {
              city_id: this.num,
              keyword: this.content,
              type: 'search'
            }
      }).then(data=>{
        console.log(data.data)
        this.search = data.data;
        console.log(this.search)
      });
  },
    preservation(value){
      console.log(value)
      if(window.localStorage.getItem('hist') == null){
        var hist = [];
      }else{
        hist = JSON.parse(window.localStorage.getItem('hist'))
        console.log(hist)
      }
      //去重
      hist.forEach((s,i)=>{
        if(s.latitude == value.latitude && s.longitude == value.longitude){
          hist.splice(i,1);
        }
      })
        hist.unshift(value)
      window.localStorage.hist = JSON.stringify(hist);
      this.$router.push({path:'/www/msite',query:{geohash:value.geohash}})
    },
    eliminate(){
      localStorage.removeItem('hist');
      if(localStorage.getItem('hist') == null){
        this.isShow = false;
      }
    },
    delete1(i){
      this.hist.splice(i,1);
    }
},
  created() {
    // console.log(this.$route.params.id)
    this.num = this.$route.params.id;
    this.axios.get(`/v1/cities/${this.num}`).then(data=>{
      // console.log(data.data)
      this.city = data.data.name;
    });
    this.hist = JSON.parse(localStorage.getItem('hist'));
    console.log(this.hist)
  }
}
</script>

<style scoped lang="less">
.head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0092e8;
  height: 50px;
  color: #e9e9e9;
  a{
    color: white;
  }
  span{
    font-weight: bolder;
    font-size: 1.5rem;
  }
}
.www{
  padding-top: 0.8rem;
  background-color: #f5f5f5;
}
.search{
  padding-top: 0.6rem;
  height: 100px;
  border-bottom: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
  input{
    width: 80%;
    border: 1px solid #e4e4e4;
    height: 2.2rem;
    margin-left: 40px;
    margin-bottom: 10px;
    padding: 0.3rem;
  }
  input:nth-child(1){
    outline: none;
  }
  input:nth-child(3){
    background-color: #0092e8;
    border-radius: 0.6rem;
  }
}
#p1{
  margin-left: 0.5rem;
}
#ul1{
  li{
    padding-top: 1rem;
    border-bottom: 1px solid #e4e4e4;
  }
}
#ul2{
  li{
    height: 3rem;
    padding: 0.6rem;
    p{
      font-size: 1.4rem;
      line-height: 1.4rem;
    }
  }
}
.his{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@import "http://at.alicdn.com/t/font_2878927_bwaxtqinx9g.css";

</style>
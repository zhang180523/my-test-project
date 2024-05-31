<template>
  <div class="homepage">
    <van-nav-bar title="上海金山国际贸易城" id="aaa">
      <template #left>
        <router-link :to="{path:'/www/search',query:{geohash:wasd}}"><van-icon name="search" size="18" id="qqq" /></router-link>
      </template>
      <template #right>
        <router-link to="/login"><h4 id="h4">登录|注册</h4></router-link>
      </template>
    </van-nav-bar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <ul class="ul1">
          <li v-for="(v,i) in array1" :key="i">
            <router-link :to="{path:'/food',query:{geohash:wasd,title:v.title}}"><img :src='"https://fuss10.elemecdn.com/"+v.image_url' alt=""><p>{{v.title}}</p></router-link>
          </li>
        </ul>
      </van-swipe-item>
      <van-swipe-item>
        <ul class="ul1">
          <li v-for="(v,i) in array2" :key="i">
            <router-link :to="{path:'/food',query:{geohash:wasd,title:v.title}}"><img :src='"https://fuss10.elemecdn.com/"+v.image_url' alt=""><p>{{v.title}}</p></router-link>
          </li>
        </ul>
      </van-swipe-item>
    </van-swipe>
    <p id="p1"><i class="iconfont icon-shangjia"></i>附近商家</p>
    <ul>
      <li class="li1" v-for="(v,i) in shops" :key="i">
        <router-link :to="{path:'/shop',query:{geohash:geohash,id:v.id}}">
          <div><img :src='"https://elm.cangdu.org/img/"+v.image_path' alt=""></div>
          <div>
            <header>
              <p><span>品牌</span><span>{{v.name}}</span></p>
              <span>保准票</span>
            </header>
            <h5 class="h5">
              <p>
<!--                <van-rate
                    v-model="value"
                    :size="25"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                />-->
                <span>{{v.rating}}</span>月销
                <span>{{v.recent_order_num}}</span>单</p>

              <p><span>蜂鸟专送</span>
                <span>准时达</span></p>
            </h5>
            <h5 class="h5_2">
              <p>￥20元起送<span>/</span>{{v.piecewise_agent_fee.tips}}</p>
              <p><span>10公里</span><span>/</span><span>40分钟</span></p>
            </h5>
          </div>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
import { Swipe, SwipeItem ,NavBar ,Icon} from 'vant';
export default {
  name: "homepage",
  components:{
    'van-swipe':Swipe,
    'van-swipe-item':SwipeItem,
    'van-nav-bar':NavBar,
    'van-icon':Icon,
  },
  data(){
    return{
      food:'',
      array1:'',
      array2:'',
      geohash:'',
      value:3,
      shops:'',
      wasd:'',
      latitude:'',
      longitude:'',
    }
  },
  created() {
    this.axios.get('/v2/index_entry').then(data=>{
      // console.log(data.data)
      this.food = data.data;
      // console.log(this.food);
      this.array1 = data.data.slice(0,8)
      this.array2 = data.data.slice(8,16)
      console.log(this.array1);
      // console.log(this.array2);
      // console.log(this.$route.query.geohash)
      this.geohash = this.$route.query.geohash;
      var storage=window.localStorage;
      storage.a = this.geohash;
      this.axios.get(`/v2/pois/${this.geohash}`).then(data=>{
        // console.log(data.data)
        return data.data
      }).then((result)=>{
        // console.log(result)
        this.latitude = result.latitude;
        // console.log(this.latitude)
        this.longitude = result.longitude;
        storage["latitude"]= this.latitude;
        storage["longitude"]= this.longitude;
        this.axios.get('/shopping/restaurants',{params:{latitude:result.latitude,longitude:result.longitude}}).then(data=>{
          // console.log(data.data)
          this.shops = data.data;
        })
      })
    });
    let storage = window.localStorage;
    this.wasd =storage.a;
  }
}
</script>

<style scoped lang="less">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  margin-top: 46px;
}
#aaa{
  background-color: #0092e8;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
}
#h4{
  color: #fffffb;
}
#qqq{
  color: #fffffb;
}
.ul1{
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  li{
    display: flex;
    justify-content: center;
    padding: 7px 0 7px 0;
    height: 80px;
    width: 25%;
    img{
      width: 46px;
      height: 46px;
      margin-bottom: 20px;
    }
    p{
      margin-top: -150px;
      font-size: 0.8rem;
      color: #666666;
    }
  }
}
.li1{
  padding: 1.2rem 0.7rem 1.2rem 0.7rem;
  border-bottom: 1px solid #f1f1f1;
  a{
    display: flex;
    color: black;
    div:nth-child(1){
      width: 69px;
      height: 69px;
      img{
        width: 100%;
        height: 100%;
      }
      margin-right: 0.5rem;
    }
    div:nth-child(2){
      width: 310px;
      header{
        display: flex;
        justify-content: space-between;
        p{
          display: inline-block;
          span:nth-child(1){
            background-color: #ffd72f;
          }
          span:nth-child(2){
            font-size: 1.1rem;
            font-weight: 600;
          }
        }
        span:nth-child(2){
          font-size: 0.8rem;
        }
      }
      .h5{
        display: flex;
        justify-content: space-between;
        p{
          display: inline-block;
        }
        p:nth-child(2){
          span{
            font-size: 0.8rem;
          }
          span:nth-child(1){
            background-color: #0092e8;
            color: white;
            padding: 0.2rem;
          }
          span:nth-child(2){
            border: 1px solid #0092e8;
            color: #0092e8;
          }
        }
      }
      h5{
        margin-top: 0.6rem;
      }
      .h5_2{
        display: flex;
        justify-content: space-between;
        p{
          font-size: 0.8rem;
        }
        p:nth-child(2){
          span{
            font-size: 0.9rem;
            margin-right: 0.2rem;
          }
          span:nth-child(1){
            color: #999;
          }
          span:nth-child(3){
            color: #3190e8;
          }
        }
      }
    }
  }

}

@import "http://at.alicdn.com/t/font_2878927_vmizyikdid.css";
</style>
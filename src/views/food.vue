<template>
  <div class="food">
    <div class="head">
      <router-link :to="{path:'/www/msite',query:{geohash:this.qqq}}"><i class="iconfont icon-fanhui"></i></router-link>
      <span>{{title}}</span>
      <span></span>
    </div>
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item title="分类" id="classleft">
        <ul>
          <li v-for="(v,i) in class1" :key="i" :class="{sss: selectIndex == i}" @click="change(i)">
            <section>
              <img :src='"https://fuss10.elemecdn.com/"+v.image_url' alt="">
              <span>{{v.name}}</span>
            </section>
            <section>
              <span>{{v.count}}</span>
              <i class="iconfont icon-youjiantou"></i>
            </section>
          </li>
        </ul>
        <ul>
          <li v-for="(v,i) in class1[selectIndex].sub_categories" :key="i" @click="part(v.id)">
              <span>{{v.name}}</span>
              <span>{{v.count}}</span>
          </li>
        </ul>
      </van-dropdown-item>
      <van-dropdown-item title="排序" id="classmiddle">
        <ul>
          <li @click="li(4)"><i class="iconfont icon-paixu"></i>
            <span>智能排序</span>
          </li>
          <li @click="li(5)"><i class="iconfont icon-juli"></i>
            <span>距离最近</span>
          </li>
          <li @click="li(6)"><i class="iconfont icon-huo"></i>
            <span>销量最高</span>
          </li>
          <li @click="li(1)"><i class="iconfont icon-qian"></i>
            <span>起送价最低</span>
          </li>
          <li @click="li(2)"><i class="iconfont icon-shijianzhongbiao"></i>
            <span>配送速度最快</span>
          </li>
          <li @click="li(3)"><i class="iconfont icon-xingxing"></i>
            <span>评分最高</span>
          </li>
        </ul>
      </van-dropdown-item>
        <van-dropdown-item title="筛选" id="van-dropdown-item">
        <section>
          <div>
            <p>配送方式</p>
            <ul>
              <li v-for="(v,i) in delivery_modes" :key="i" @click="zxc(6)"><i :class="iconfont">&#xef89;</i><span>{{v.text}}</span></li>
            </ul>
          </div>
        </section>
        <section>
          <p>商家属性(可以多选)</p>
          <ul>
            <li v-for="(v,i) in activity_attributes" :key="i" @click="zxc(i)"><span :style="`color:#${v.icon_color}`">{{v.icon_name}}</span><span>{{v.name}}</span></li>
          </ul>
        </section>
        <section>
          <div>清空</div>
          <div>确定</div>
        </section>
      </van-dropdown-item>
    </van-dropdown-menu>
    <ul>
      <li class="li1" v-for="(v,i) in class2" :key="i">
        <router-link :to="{path:'/shop',query:{geohash:geohash,id:v.id}}">
          <div><img :src='"https://elm.cangdu.org/img/"+v.image_path' alt=""></div>
          <div>
            <header>
              <p><span>品牌</span><span>{{v.name}}</span></p>
              <span>保准票</span>
            </header>
            <h5 class="h5">
              <p>
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
import {DropdownMenu,DropdownItem } from 'vant';
export default {
  name: "food",
  data(){
    return{
      title:'',
      qqq:'',
      class1:[],
      selectIndex:0,
      latitude:'',
      longitude:'',
      class2:[],
      geohash:'',
      delivery_modes:'',
      activity_attributes:'',
      newarr:[],
    }
  },
  methods:{
    change(index){
      this.selectIndex = index;
    },
    part(index){
      console.log(index,this.latitude,this.longitude)
      this.axios.get('/shopping/restaurants', {params:{latitude:this.latitude,longitude:this.longitude,'restaurant_category_ids[]':index}}).then(data=>{
        console.log(data.data)
        this.class2 = data.data;
      })
    },
    zxc(index){
      this.newarr.push(index);
    },
    li(index){
      this.axios('/shopping/restaurants',{params:{latitude:this.latitude,longitude:this.longitude,order_by:index}}).then(data=>{
        console.log(data.data);
        this.class2 = data.data;
      })
    }
  },
  components:{
    'van-dropdown-menu':DropdownMenu,
    'van-dropdown-item':DropdownItem,
  },
  created() {
    var storage = window.localStorage;
    this.qqq =  storage.a;
    this.title = this.$route.query.title;
    this.geohash = this.$route.query.geohash;
    this.latitude = storage.latitude;
    this.longitude = storage.longitude;
    this.axios.get('/shopping/v2/restaurant/category').then(data=>{
      console.log(data.data)
      this.class1 = data.data;
      console.log(this.class1)
      return  data.data;
    })
    this.axios.get('/shopping/restaurants', {params:{latitude:this.latitude,longitude:this.longitude}}).then(data=>{
      // console.log(data.data)
      this.class2 = data.data;
    })
    this.axios.get('/shopping/v1/restaurants/delivery_modes').then(data=>{
      // console.log(data.data)
      this.delivery_modes = data.data;
    })
    this.axios.get('/shopping/v1/restaurants/activity_attributes').then(data=>{
      // console.log(data.data)
      this.activity_attributes = data.data;
    })
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
#classleft{
  ul{
    display: inline-block;
    width: 50%;
    li{
      display: flex;
      justify-content: space-around;
      img{
        width: 1rem;
        height: 1rem;
      }
    }
  }
  ul:nth-child(1){
    background-color: #f1f1f1;
    li{
      margin-top: 1rem;
      section:nth-child(2){
        span{
          background-color: #cccccc;
          border-radius: 2rem;
          padding: 0.2rem;
        }
      }
    }
  }
  ul:nth-child(2){
    float: right;
    li{
      margin-top: 1rem;
    }
  }
}
.sss{
  background-color: white;
}
#van-dropdown-item{
  section{
    margin-top: 1rem;
    ul{
      margin-top: 1rem;
      li{
        border: 1px solid #eee;
        display: inline-block;
        width: 30%;
        margin-bottom: 1rem;
      }
    }
  }
  section:nth-child(3){
    display: flex;
    div{
      width: 50%;
      padding: 0.5rem 2.5rem;
      font-size: 1.6rem;
      text-align: center;
      border-radius: 1rem;
    }
    div:nth-child(1){
      background-color: white;
    }
    div:nth-child(2){
      background-color: #00d47d;
    }
  }
}
.li1 {
  padding: 1.2rem 0.7rem 1.2rem 0.7rem;
  border-bottom: 1px solid #f1f1f1;

  a {
    display: flex;
    color: black;

    div:nth-child(1) {
      width: 69px;
      height: 69px;

      img {
        width: 100%;
        height: 100%;
      }

      margin-right: 0.5rem;
    }

    div:nth-child(2) {
      width: 310px;

      header {
        display: flex;
        justify-content: space-between;

        p {
          display: inline-block;

          span:nth-child(1) {
            background-color: #ffd72f;
          }

          span:nth-child(2) {
            font-size: 1.1rem;
            font-weight: 600;
          }
        }

        span:nth-child(2) {
          font-size: 0.8rem;
        }
      }

      .h5 {
        display: flex;
        justify-content: space-between;

        p {
          display: inline-block;
        }

        p:nth-child(2) {
          span {
            font-size: 0.8rem;
          }

          span:nth-child(1) {
            background-color: #0092e8;
            color: white;
            padding: 0.2rem;
          }

          span:nth-child(2) {
            border: 1px solid #0092e8;
            color: #0092e8;
          }
        }
      }

      h5 {
        margin-top: 0.6rem;
      }

      .h5_2 {
        display: flex;
        justify-content: space-between;

        p {
          font-size: 0.8rem;
        }

        p:nth-child(2) {
          span {
            font-size: 0.9rem;
            margin-right: 0.2rem;
          }

          span:nth-child(1) {
            color: #999;
          }

          span:nth-child(3) {
            color: #3190e8;
          }
        }
      }
    }
  }
}
#classmiddle{
  li{
    display: flex;
    padding: 0.6rem;
    border: .025rem solid #e4e4e4;
    height: 45px;
    align-items: center;
    i{
      color: #00d47d;
    }
    span{
      margin-left: 0.6rem;
      color: #9a9a9a;
    }
  }
}
@import "http://at.alicdn.com/t/font_2878927_5guftk93n06.css";
</style>
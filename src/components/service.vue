<template>
  <div class="service">
    <div class="head">
      <router-link
        :to="{
          path: '/www/mine',
          query: {
            geohash: geohash,
          },
        }"
        ><i class="iconfont icon-fanhui"></i
      ></router-link>
      <span>服务中心</span>
      <span></span>
    </div>
    <section id="section1">
      <div><i class="iconfont icon-kefu1"></i><span>在线客服</span></div>
      <div><i class="iconfont icon-dianhua"></i><span>在线客服</span></div>
    </section>
    <section id="section2">
      <h4>热门问题</h4>
      <ul>
        <li v-for="(v, i) in arr1" :key="i" @click="wasd()">
          <span>{{ v }}</span>
          <i class="iconfont icon-youjiantou"></i>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "service",
  data() {
    return {
      geohash: "",
      arr1: [],
      arr2: [],
    };
  },
  methods: {
    wasd() {},
  },
  created() {
    this.geohash = localStorage.getItem("a");
    this.axios.get("/v3/profile/explain").then((data) => {
      //   console.log(data.data);
      for (var i in data.data) {
        // console.log(data.data[i]);
        // console.log(i, i.substr(-7, 7));
        if (i.substr(-7, 7) == "Caption") {
          //   console.log(i, i.indexOf("C"));
          //   let index = i.indexOf("C");
          //   console.log(i.substr(0, index));
          this.arr1.push(data.data[i]);
          //   this.arr1.push(i.substr(0, index));
          //   console.log(this.arr1);
        }
      }
      console.log(this.arr1);
    });
  },
};
</script>

<style lang='less' scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(0, 146, 232);
  height: 50px;
  span {
    font-size: 1.1rem;
  }
  color: rgb(255, 255, 255);
  a {
    color: rgb(255, 255, 255);
    font-size: 1.2rem;
  }
  padding: 0px 10px 0px 10px;
  span:nth-child(2) {
    font-weight: 800;
    font-size: 1.5rem;
  }
}
#section1 {
  display: flex;
  div {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 20px 0px 20px 0px;
  }
  div:nth-child(1) {
    i {
      color: #ff7244;
      font-size: 2rem;
    }
  }
  div:nth-child(2) {
    i {
      color: #3cc42b;
      font-size: 2rem;
    }
  }
}
#section2 {
  h4 {
    padding-left: 1.2rem;
    border-bottom: 1px solid #666;
    height: 77px;
    font-size: 19px;
    line-height: 77px;
    color: #666;
  }
  li {
    display: flex;
    justify-content: space-between;
    padding: 0px 1.2rem 0px 1.2rem;
    height: 51px;
    line-height: 51px;
    span {
      color: #666;
    }
  }
}
@import "http://at.alicdn.com/t/font_2878927_tjbnum276ii.css";
</style>
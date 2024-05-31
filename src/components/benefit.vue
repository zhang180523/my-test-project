<template>
  <div class="benefit">
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
      <span>我的优惠</span>
      <span></span>
    </div>
    <van-tabs>
      <van-tab title="红包" id="van-tab1">
        <header>
          <section>有<span>3</span>个红包即将到期</section>
          <section>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAvJJREFUSA21Vk1IFVEU/s7MvOd/+U+pkZmEEBXiIgpq06KFYUmLFrZp0S4fFAW1ioi2RU9oFbQJCgoqQYIWEkKQixKK7IfMCnuEYvlSek99M7d77rzRGWfu06Du5s49P98599zzM4QCa3dyumlR2IeFEJ0gbJWiDXnxFATGiGggRuaj4UTNhA6GohjtfVMNcMQlgjghwc0oGY8mjdgCdAsGXRzprUt5dG8PGWjv+95FNt0WEBWe0Fp2As0KUxwf6d3Q75c3/IeO5GQCNj34W3DGUDpSV2H4QJduwJ4zuBQNGPVky+KELVUmZEgw/iOHuQXhsVbs5MAU3d5NlAGOOdnOuyjPK4oIp/aW4+iOEhlm1x/bEbj/OoO+Z3P4vRg25IbLaOM3sZR5+aBR4Ax39VAlOpriGPyYxdNP8zAl8cj2EhzbVYraMgPnBtIrbpAPl8SUjJPkpmLuc1S2dLYV4/LB9XjyIYvzj5eBLBnEuz01aKm20HNnGm8ncyEjnF0xspqNfJ5HpmJ7Y0wp9o9mAgA5Bxj+uqBo2+rcIAQE5IEdZmxDFdFKbv78fiqHh28yGJsOe9i4zvVpJhN+Aw+OsS1VoRqZe6/Y86D3rLxzYwx7NseRzjp4+c29iQca2GX1c0p65R/g6Q4t1Saud1Uq9gX5LrPzGu9cgIbInNeB15cbuNFdhdIYyeyZwfP8O+jkmc4GQv1Dp3BmXwXqy01cGfyFofECoVkGSBncFZfP+q+4fNMDrUWYSOfQP5rVC/o5ElsWJw34abpvLirTIHz5aetEQnTGLlhofg0urjppJCNbw0y24MMqtaVC42Gh+rkfLeK72CK01lpoltW7lsWYjO1mkRwW3KAKKW6q5PSswtn9q48JhSUxGU8Z4K7HwwKQrVazON+HZLMbSa2WPeS4g8edbm7/zYPysHAccU03EzS2fWRyDINOv0jUJz1iwAAT/+vIZAM8iYRptIGMm5wJTCu0lIyUZR1vivnlQzfwM//Fb8sfhhUzHMwI/u8AAAAASUVORK5CYII="
              alt=""
            />
            <span>红包说明</span>
          </section>
        </header>
        <ul>
          <li v-for="(v, i) in hongbaos" :key="i">
            <section>
              <div>
                <span>￥</span><span>{{ v.amount }}</span
                ><span>.</span><span>0</span>
                <p>{{ v.description_map.sum_condition }}</p>
              </div>
              <div>
                <h4>{{ v.name }}</h4>
                <p>{{ v.validity_periods }}</p>
                <p>{{ v.description_map.phone }}</p>
              </div>
              <div>{{ v.description_map.validity_delta }}</div>
            </section>
          </li>
        </ul>
        <p id="p1">查看历史红包 ></p>
        <div id="div1">
          <p>兑换红包</p>
          <p>推荐有奖</p>
        </div>
      </van-tab>
      <van-tab title="商家代金券" id="van-tab2"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
export default {
  name: "benefit",
  data() {
    return {
      hongbaos: "",
    };
  },
  components: {
    "van-tabs": Tabs,
    "van-tab": Tab,
  },
  created() {
    this.geohash = localStorage.getItem("a");
    this.axios
      .get("/promotion/v2/users/1/hongbaos", {
        params: { limit: 20, offset: 0 },
      })
      .then((data) => {
        console.log(data.data);
        this.hongbaos = data.data;
      });
  },
};
</script>

<style lang="less">
body {
  background-color: #f5f5f5;
}
</style>
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
#van-tab1 {
  padding: 0px 1.2rem 0px 1.2rem;
  header {
    display: flex;
    justify-content: space-between;
    section:nth-child(1) {
      span {
        color: #ff0000;
      }
    }
    section:nth-child(2) {
      img {
        width: 16px;
      }
    }
  }
  ul {
    margin-top: 1rem;
    li {
      margin-bottom: 0.8rem;
      border-top: 2px dashed red;
      background-color: #fff;
      section {
        padding: 25px 12px 20px 12px;
        display: flex;
        justify-content: space-between;
        div:nth-child(1) {
          span {
            color: red;
          }
          span:nth-child(1) {
            font-size: 1.4rem;
          }
          span:nth-child(2) {
            font-size: 2rem;
          }
          span:nth-child(3) {
            font-size: 2rem;
          }
          span:nth-child(4) {
            font-size: 1.4rem;
          }
          p {
            font-size: 0.8rem;
          }
        }
        div:nth-child(2) {
          p {
            font-size: 0.8rem;
            color: #666;
          }
        }
        div:nth-child(3) {
          color: red;
        }
      }
    }
  }
  #p1 {
    text-align: center;
    padding: 12px 0px 72px 0px;
  }
  #div1 {
    position: fixed;
    bottom: 0;
    width: 100%;
    p {
      width: 50%;
      display: inline-block;
      font-size: 1.2rem;
      text-align: center;
    }
  }
}
@import "http://at.alicdn.com/t/font_2878927_1k61276fcum.css";
</style>
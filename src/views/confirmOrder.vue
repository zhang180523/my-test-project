<template>
  <div>
    <div class="head">
      <i class="iconfont icon-fanhui" onclick="window.history.go(-1)"></i>
      <span>确认订单</span>
      <router-link to="/login">登录|注册</router-link>
    </div>
    <div id="address">
      <div @click="address">
        <i class="iconfont icon-juli"></i>
        <span>请添加一个收货地址</span>
      </div>
      <i class="iconfont icon-youjiantou"></i>
    </div>
    <hr />
    <div id="order">
      <div id="delivery">
        <p id="p1">送达时间</p>
        <div>
          <p>尽快送达|预计17:10</p>
          <span>蜂鸟专送</span>
        </div>
      </div>
      <div id="Payment">
        <div>
          <p>支付方式</p>
          <section>
            <span>在线支付</span><i class="iconfont icon-youjiantou"></i>
          </section>
        </div>
        <div>
          <p>红包</p>
          <section>
            <span> 暂时只在饿了么APP中支持 </span>
          </section>
        </div>
      </div>
      <div id="commodity">
        <header>
          <img :src="'https://elm.cangdu.org/img/' + datas.image_path" alt="" />
          <h3>{{ datas.name }}</h3>
        </header>
        <ul>
          <li v-for="(v, i) in menu" :key="i">
            <p>{{ v.name }}</p>
            <section>
              <p class="p2">
                *<span>{{ v.SpanNum }}</span>
              </p>
              <p>
                ￥<span>{{ v.SpanNum * v.price }}</span>
              </p>
            </section>
          </li>
          <li>
            <p>ee</p>
            <section>
              <p class="p2">*<span>1</span></p>
              <p>￥<span>20</span></p>
            </section>
          </li>
          <li>
            <p>餐盒</p>
            <section>
              <p>￥4184</p>
            </section>
          </li>
          <li>
            <p>配送费</p>
            <section>
              <p>￥4</p>
            </section>
          </li>
        </ul>
        <footer>
          <p>订单￥4228</p>
          <section>
            <p>待支付</p>
            <p>￥4228</p>
          </section>
        </footer>
      </div>
      <ul id="remarks">
        <li>
          <p>订单备注</p>
          <section>
            <span>口味、偏好等</span>
            <i class="iconfont icon-youjiantou"></i>
          </section>
        </li>
        <li>
          <p>发票抬头</p>
          <section>
            <span>不需要开发票</span>
            <i class="iconfont icon-youjiantou"></i>
          </section>
        </li>
      </ul>
    </div>
    <div id="bottomtar">
      <p><span>待支付</span><span>￥4228</span></p>
      <p>确认下单</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "confirmOrder",
  data() {
    return {
      shopId: "",
      datas: "",
      menu: "",
    };
  },
  created() {
    this.shopId = this.$route.query.shopId;
    this.axios.get(`/shopping/restaurant/${this.shopId}`).then((data) => {
      console.log(data.data);
      this.datas = data.data;
    });
    this.menu = JSON.parse(window.localStorage.getItem(`${this.shopId}`));
    console.log(this.menu);
  },
  methods: {
    address() {
      this.$router.push("/add");
    },
  },
};
</script>
<style lang="less" scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0092e8;
  height: 50px;
  color: #e9e9e9;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  a {
    color: white;
  }
  span {
    font-weight: bolder;
    font-size: 1.5rem;
  }
}
hr {
  border: 2px dashed red;
}
#address {
  i:nth-child(1) {
    color: #2c95df;
  }
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.8rem 1rem 0.8rem;
  align-items: center;
  margin-top: 50px;
}
#order {
  background-color: #f4f4f4;
  #delivery {
    background-color: #fff;
    border-left: 5px solid#0092e8;
    margin: 0.6rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    #p1 {
      font-weight: 800;
      font-size: 1.4rem;
    }
    div {
      p {
        color: #588fbc;
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 0.6rem;
      }
      span {
        color: #fff;
        background-color: #0092e8;
        float: right;
        padding: 0.2rem;
        font-size: 0.8rem;
      }
    }
  }
  #Payment {
    background-color: #fff;
    div {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      margin-bottom: 0.6rem;
      section {
        span {
          font-size: 0.8rem;
          color: #666;
        }
        i {
          font-size: 0.8rem;
        }
      }
    }
  }
  #commodity {
    background-color: #fff;
    margin-top: 1rem;
    header {
      padding: 1rem;
      img {
        width: 2rem;
      }
      h3 {
        display: inline-block;
        font-size: 1.4rem;
        color: #666;
        margin-left: 0.6rem;
      }
    }
    ul {
      li {
        display: flex;
        padding: 0.8rem;
        justify-content: space-between;
        p {
          color: #666;
        }
        section {
          display: flex;
          justify-content: space-between;
          p:nth-child(2) {
            margin-left: 1.8rem;
            color: #666;
          }
          .p2 {
            color: #dd934e;
          }
        }
      }
    }
    footer {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #666;
      padding: 0.8rem;
      section {
        p {
          color: #dd934e;
          font-weight: 800;
        }
      }
    }
  }
  #remarks {
    background-color: #fff;
    li {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      section {
        color: #666;
      }
    }
  }
}
#bottomtar {
  display: flex;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  p {
    height: 50px;
    padding: 0.6rem;
    line-height: 50px;
    font-size: 1.4rem;
    color: #fff;
    span {
      font-size: 1.4rem;
      color: #fff;
    }
  }
  p:nth-child(1) {
    width: 70%;
    background-color: #3c3c3c;
  }
  p:nth-child(2) {
    width: 30%;
    background-color: #56d176;
  }
}
@import "http://at.alicdn.com/t/font_2878927_ksy36h39szo.css";
</style>
<template>
  <div class="mine">
    <div class="head">
      <router-link to="/home"><i class="iconfont icon-fanhui"></i></router-link>
      <span>我的</span>
      <span></span>
    </div>
    <div class="www" @click="Jump">
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201712%2F15%2F20171215221023_KiYWM.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637409896&t=9f49168ab7e172d2cf7771b8e58bc52f"
        alt=""
      />
      <div>
        <p>{{ www ? "登录/注册" : user.username }}</p>
        <p><i class="iconfont icon-shouji"></i><span>暂无绑定手机号</span></p>
      </div>
      <span><i class="iconfont icon-youjiantou"></i></span>
    </div>
    <router-link to="/login" class="www"> </router-link>
    <ul>
      <li @click="balance">
        <span><b>0.00</b>元</span><span>我的余额</span>
      </li>
      <li @click="benefit">
        <span
          ><b>{{ www ? "3" : user.gift_amount }}</b
          >个</span
        ><span>我的优惠</span>
      </li>
      <li @click="points">
        <span><b>0</b>分</span><span>我的积分</span>
      </li>
    </ul>
    <router-link to="/login" class="a1"
      ><span><i class="iconfont icon-dingdan"></i>我的订单</span
      ><span><i class="iconfont icon-youjiantou"></i></span
    ></router-link>
    <router-link to="/login" class="a1"
      ><span><i class="iconfont icon-jifen-jifenshangcheng"></i>积分商城</span
      ><span><i class="iconfont icon-youjiantou"></i></span
    ></router-link>
    <router-link to="/vipcard" class="a1"
      ><span><i class="iconfont icon-huangguan"></i>饿了么会员卡</span
      ><span><i class="iconfont icon-youjiantou"></i></span
    ></router-link>
    <router-link to="/service" class="a1"
      ><span><i class="iconfont icon-qiyefuwu_fuwuzhongxin"></i>服务中心</span
      ><span><i class="iconfont icon-youjiantou"></i></span
    ></router-link>
    <router-link to="/login" class="a1"
      ><span><i class="iconfont icon-elemo"></i>下载饿了么APP</span
      ><span><i class="iconfont icon-youjiantou"></i></span
    ></router-link>
  </div>
</template>

<script>
export default {
  name: "mine",
  data() {
    return {
      user: "",
      www: true,
    };
  },
  methods: {
    Jump() {
      if (this.www) {
        this.$router.push("/login");
      } else {
        this.$router.push("/profile");
      }
    },
    balance() {
      this.$router.push("/balance");
    },
    benefit() {
      this.$router.push("/benefit");
    },
    points() {
      this.$router.push("/points");
    },
  },
  created() {
    // this.axios.get("v1/user").then((data) => {
    //   console.log(data.data);
    // });
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
    var qq = this.user;
    if (qq != null) {
      this.www = false;
      console.log(this.www);
    }
  },
};
</script>

<style scoped lang="less">
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
.www {
  display: flex;
  justify-content: space-around;
  align-items: center;
  img {
    width: 64px;
    height: 64px;
    border-radius: 2rem;
  }
  padding: 20px;
  background-color: #0092e8;
  div {
    p:nth-child(1) {
      color: white;
      font-weight: 800;
      font-size: 1.4rem;
    }
    p:nth-child(2) {
      color: white;
    }
  }
}
ul {
  li {
    width: 32%;
    height: 94px;
    display: inline-block;
    text-align: center;
    span:nth-child(1) {
      display: block;
      margin: 22px 0px 11px 0px;
      b {
        color: #ff9300;
        font-size: 2.5rem;
      }
    }
  }
}
.a1 {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
  margin-top: 0.8rem;
  color: black;
  span {
    font-size: 1.2rem;
  }
  span:nth-child(1) {
    i {
      color: #9a6e3a;
    }
  }
}
@import "http://at.alicdn.com/t/font_2878927_1k61276fcum.css";
</style>
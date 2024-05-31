<template>
  <div class="profile">
    <div class="head">
      <router-link :to="{ path: '/www/mine', query: { geohash: wasd } }"
        ><i class="iconfont icon-fanhui"></i
      ></router-link>
      <span>账号信息</span>
      <span></span>
    </div>
    <div>
      <section class="sec1">
        <h2>头像</h2>
        <div>
          <img :src="'https://elm.cangdu.org/img/' + user.avatar" alt="" />
          <span><i class="iconfont icon-youjiantou"></i></span>
        </div>
      </section>
      <section class="sec">
        <h2>用户名</h2>
        <div>
          <span>{{ user.username }}</span>
          <span><i class="iconfont icon-youjiantou"></i></span>
        </div>
      </section>
      <section class="sec">
        <h2 @click="address">收货地址</h2>
        <div>
          <span><i class="iconfont icon-youjiantou"></i></span>
        </div>
      </section>
      <p class="p1">账号绑定</p>
      <section class="sec">
        <h2 id="h2_1"><i class="iconfont icon-shouji1"></i>手机</h2>
        <div>
          <span><i class="iconfont icon-youjiantou"></i></span>
        </div>
      </section>
      <p class="p1">安全设置</p>
      <section class="sec">
        <h2>登录密码</h2>
        <div>
          <span>修改</span>
          <span><i class="iconfont icon-youjiantou"></i></span>
        </div>
      </section>
      <section id="sign-out" @click="signOut">退出登录</section>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      user: "",
      wasd: "",
    };
  },
  created() {
    this.axios.get("/v1/user").then((data) => {
      console.log(data.data);
      this.user = data.data;
    });
    this.wasd = window.localStorage.a;
  },
  methods: {
    signOut() {
      this.axios.get("/v2/signout").then((data) => {
        console.log(data.data);
        localStorage.removeItem("user");
      });
      this.$router.push({ path: "/www/mine", query: { geohash: this.wasd } });
    },
    address() {
      this.$router.push("/address1");
    },
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
.sec {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-top: 1rem;
  background-color: #f2f2f2;
  color: #333;
}
.sec1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  height: 80px;
  background-color: #f2f2f2;
  img {
    width: 51px;
    vertical-align: middle;
    border-radius: 1rem;
  }
}
#h2_1 {
  i {
    margin-right: 0.6rem;
    color: #00b1ff;
  }
}
#sign-out {
  background-color: #ed4e3e;
  color: white;
  text-align: center;
  margin: 1.5rem 0.7rem 1.5rem 0.7rem;
  height: 38px;
  line-height: 38px;
  font-size: 1.2rem;
  border-radius: 1rem;
}
@import "http://at.alicdn.com/t/font_2878927_bwaxtqinx9g.css";
</style>
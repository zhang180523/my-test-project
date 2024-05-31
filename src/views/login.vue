<template>
  <div class="login">
    <div class="head">
      <i class="iconfont icon-fanhui" onclick="window.history.go(-1)"></i>
      <span>密码登录</span>
      <span></span>
    </div>
    <div class="big">
      <div class="div1">
        <section>
          <input
            type="text"
            placeholder="账号"
            class="input1"
            v-model="username"
          />
        </section>
        <section>
          <input
            type="text"
            placeholder="密码"
            class="input1"
            v-model="password"
          />
        </section>
        <section>
          <input type="text" placeholder="验证码" v-model="captcha_code" />
          <div class="div2">
            <img :src="img" alt="" />
            <div class="div3" @click="changeimg">
              <p>看不清</p>
              <p>换一张</p>
            </div>
          </div>
        </section>
      </div>
    </div>
    <p class="p1">温馨提示：未注册过的账号，登录时将自动注册</p>
    <p class="p1">注册的用户可凭账号密码登录</p>
    <input type="submit" value="登录" id="input1" @click="Signin" />
    <router-link to="/forget" id="a1">重置密码？</router-link>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      img: "",
      username: "",
      password: "",
      captcha_code: "",
      geohash: "",
    };
  },
  methods: {
    changeimg() {
      this.axios.post("/v1/captchas").then((data) => {
        // console.log(data.data.code);
        this.img = data.data.code;
      });
    },
    Signin() {
      this.axios
        .post("/v2/login", {
          username: this.username,
          password: this.password,
          captcha_code: this.captcha_code,
        })
        .then((data) => {
          console.log(data.data);
          window.localStorage.setItem("user", JSON.stringify(data.data));
        });
      this.$router.push({
        path: "/www/mine",
        query: { geohash: this.geohash },
      });
    },
  },
  created() {
    this.axios.post("/v1/captchas").then((data) => {
      // console.log(data.data.code);
      this.img = data.data.code;
    });
    this.geohash = localStorage.getItem("a");
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
.big {
  background-color: #f5f5f5;
}
.div1 {
  margin-top: 1rem;
  .input1 {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #f1f1f1;
    outline: none;
  }
  section:nth-child(3) {
    padding: 0.8rem;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    input {
      width: 50%;
      border: none;
      outline: none;
    }
    .div2 {
      width: 40%;
      display: flex;
      justify-content: space-between;
    }
    .div3 {
      p:nth-child(1) {
        color: #666;
      }
      p:nth-child(2) {
        color: #3b95e9;
      }
    }
  }
}
.p1 {
  color: red;
  padding: 0.8rem;
  font-size: 0.8rem;
}
#input1 {
  background-color: #00dc6e;
  padding: 0.5rem;
  width: 90%;
  margin-left: 20px;
  border-radius: 0.6rem;
  color: white;
  font-size: 1.4rem;
  border: none;
}
#a1 {
  color: #0097e9;
  display: block;
  margin-top: 1.5rem;
  float: right;
}
@import "http://at.alicdn.com/t/font_2878927_1k61276fcum.css";
</style>
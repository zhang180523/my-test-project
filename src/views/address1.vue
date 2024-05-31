<template>
  <div class="address1">
    <div class="head">
      <router-link to="/profile"
        ><i class="iconfont icon-fanhui"></i
      ></router-link>
      <span>编辑地址</span>
      <span @click="wasd">{{ isshow ? "编辑" : "完成" }}</span>
    </div>
    <ul>
      <li v-for="(v, i) in address" :key="i">
        <div>
          <p>
            {{ v.name }}
          </p>
          <span>{{ v.cell_phone }}</span>
        </div>
        <div v-show="!isshow" @click="delete1(i)"><span>x</span></div>
      </li>
    </ul>
    <div id="newadd" @click="adddizhi">
      <span>新增地址</span><i class="iconfont icon-youjiantou"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "address1",
  data() {
    return {
      address: "",
      isshow: true,
    };
  },
  methods: {
    adddizhi() {
      this.$router.push("/add");
    },
    wasd() {
      this.isshow = !this.isshow;
    },
    delete1(i) {
      // this.address.splice(i, 1);
      let address1 = JSON.parse(localStorage.getItem("address"));
      address1.splice(i, 1);
      localStorage.setItem("address", JSON.stringify(address1));
      this.address = JSON.parse(localStorage.getItem("address"));
    },
  },
  created() {
    this.address = JSON.parse(localStorage.getItem("address"));
    console.log(this.address);
  },
};
</script>
<style lang="less">
body {
  background-color: #f2f2f2;
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
ul {
  margin-top: 1rem;
  li {
    background-color: #fff;
    padding: 0.6rem;
    display: flex;
    justify-content: space-between;
    div:nth-child(2) {
      span {
        font-size: 1.6rem;
      }
    }
  }
  li:nth-child(1) {
    background-color: #fff8c4;
  }
}
#newadd {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  height: 30px;
  padding: 0.6rem;
  span {
    font-size: 1.2rem;
    color: #666;
    i {
      font-size: 1.2rem;
    }
  }
}
@import "http://at.alicdn.com/t/font_2878927_ksy36h39szo.css";
</style>
<template>
  <div class="add">
    <div class="head">
      <router-link to="/profile"
        ><i class="iconfont icon-fanhui"></i
      ></router-link>
      <span>新增地址</span>
      <span></span>
    </div>
    <form action="">
      <section>
        <div>
          <input type="text" placeholder="请输入你的姓名" v-model="name" />
        </div>
        <div>
          <input
            type="text"
            placeholder="小区/写字楼/学校等"
            v-model="quarters"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="请填写详细送餐地址"
            v-model="detailed"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="请填写能够联系到您的手机号"
            v-model="cell_phone"
          />
        </div>
        <div>
          <input type="text" placeholder="备用联系电话(选填)" v-model="spare" />
        </div>
      </section>
      <section>
        <button @click="add_new">新增地址</button>
      </section>
    </form>
  </div>
</template>

<script>
export default {
  name: "add",
  data() {
    return {
      name: "",
      quarters: "",
      detailed: "",
      cell_phone: "",
      spare: "",
    };
  },
  methods: {
    add_new() {
      let address = JSON.parse(localStorage.getItem("address"));
      if (address == null) {
        //不存在就创建一个新的数组
        let arr = new Array();
        arr.push({
          name: this.name,
          quarters: this.quarters,
          detailed: this.detailed,
          cell_phone: this.cell_phone,
          spare: this.spare,
        });
        localStorage.setItem("address", JSON.stringify(arr)); //转为对象
      } else {
        //存在就直接添加到数组头部
        address.unshift({
          name: this.name,
          quarters: this.quarters,
          detailed: this.detailed,
          cell_phone: this.cell_phone,
          spare: this.spare,
        });
        localStorage.setItem("address", JSON.stringify(address)); //转为对象
      }
      this.$router.push("/address1");
    },
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
form {
  margin-top: 1rem;
  section:nth-child(1) {
    background-color: #fff;
    div {
      padding-bottom: 0.6rem;
      input {
        background-color: #f2f2f2;
        width: 90%;
        border-radius: 0.4rem;
        padding: 0.45rem;
        margin: 0px 0.8rem 0px 0.8rem;
        outline: none;
        border: none;
        font-size: 1.2rem;
      }
    }
  }
  section:nth-child(2) {
    text-align: center;
    margin-top: 1rem;
    button {
      background-color: #00dc6e;
      width: 95%;
      font-size: 1.2rem;
      padding: 0.6rem;
      border: none;
      border-radius: 0.5rem;
      color: #fff;
    }
  }
}
@import "http://at.alicdn.com/t/font_2878927_ksy36h39szo.css";
</style>
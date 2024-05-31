<template>
  <div class="shop">
    <div class="head">
      <router-link
        :to="{ path: '/www/msite', query: { geohash: this.geohash } }"
        ><i class="iconfont icon-fanhui"></i
      ></router-link>
    </div>
    <div class="div1">
      <div>
        <img :src="'https://elm.cangdu.org/img/' + datas.image_path" alt="" />
      </div>
      <div>
        <h4>{{ datas.name }}</h4>
        <p>{{ datas.category }}/{{ tips }}</p>
        <p>公告：{{ datas.promotion_info }}</p>
      </div>
      <div><i class="iconfont icon-youjiantou"></i></div>
    </div>
    <div class="div2">
      <ul>
        <li v-for="(v, i) in datas.supports" :key="i">
          <span>{{ v.icon_name }}</span>
          <span>{{ v.name }}</span>
        </li>
      </ul>
      <span>{{ num }}个活动<i class="iconfont icon-youjiantou"></i></span>
    </div>
    <div>
      <van-tabs>
        <van-tab title="商品" id="van-tab1">
          <ul id="ul1">
            <li
              v-for="(v, i) in menu"
              :key="i"
              @click="change(i)"
              :class="{ sss: selectIndex == i }"
            >
              <a :href="'#' + v.name">{{ v.name }}</a>
            </li>
          </ul>
          <ul id="ul2">
            <div v-for="(v, i) in menu" :key="i">
              <header>
                <a :name="v.name"
                  ><span>{{ v.name }}</span
                  ><span>{{ v.description }}</span></a
                >
              </header>
              <li v-for="(k, index) in v.foods" :key="index">
                <section id="section1">
                  <section>
                    <img
                      :src="'https://elm.cangdu.org/img/' + k.image_path"
                      alt=""
                    />
                  </section>
                  <section>
                    <h3>{{ k.name }}</h3>
                    <p>{{ k.description }}</p>
                    <p>
                      <span>月售{{ k.month_sales }}</span
                      ><span>{{ k.rating_count }}评论</span>
                    </p>
                    <p>{{ k.image_text }}</p>
                  </section>
                </section>
                <footer>
                  <section>
                    <span
                      >￥<span>{{ k.specfoods[0].price }}</span
                      >起</span
                    >
                  </section>
                  <section>
                    <div v-show="isshow4">
                      <input
                        type="submit"
                        value="-"
                        @click="
                          add(k.item_id, k.name, k.specfoods[0].price, '0')
                        "
                        :ref="'l' + k.item_id"
                      /><span :id="'price' + k.item_id" :ref="k.item_id"
                        >0</span
                      >
                    </div>
                    <input
                      type="submit"
                      value="+"
                      @click="add(k.item_id, k.name, k.specfoods[0].price, '1')"
                    />
                  </section>
                </footer>
              </li>
            </div>
          </ul>
        </van-tab>
        <van-tab title="评价">
          <header id="header1">
            <section>
              <p>{{ scores }}</p>
              <p>综合评分</p>
              <p>高于周边商家{{ percentage }}%</p>
            </section>
            <section>
              <p>
                <span>服务态度</span>
                <van-rate
                  v-model="value"
                  :size="12"
                  color="#ffd21e"
                  void-icon="star"
                  void-color="#eee"
                />
                <span>{{ overall_score }}</span>
              </p>
              <p>
                <span>服务态度</span>
                <van-rate
                  v-model="value"
                  :size="12"
                  color="#ffd21e"
                  void-icon="star"
                  void-color="#eee"
                />
                <span>{{ food_score }}</span>
              </p>
              <p><span>送达时间</span><span>分钟</span></p>
            </section>
          </header>
          <ul id="ul3">
            <li v-for="(v, i) in tags" :key="i">{{ v.name }}({{ v.count }})</li>
          </ul>
          <ul id="ul4">
            <li v-for="(v, i) in ratings" :key="i">
              <img
                :src="
                  v.avatar
                    ? 'https://fuss10.elemecdn.com/' +
                      v.avatar.slice(0, 1) +
                      '/' +
                      v.avatar.slice(1, 3) +
                      '/' +
                      v.avatar.slice(3) +
                      '.jpeg'
                    : 'https://elm.cangdu.org/img/default.jpg'
                "
                id="img1"
              />
              <section id="section3">
                <header id="header2">
                  <section>
                    <p>{{ v.username }}</p>
                    <p>
                      <van-rate
                        v-model="value"
                        :size="12"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                      />
                      <span>{{ v.time_spent_desc }}</span>
                    </p>
                  </section>
                  <p>{{ v.rated_at }}</p>
                </header>
                <ul id="ul5">
                  <li v-for="(value, index) in v.item_ratings" :key="index">
                    <img
                      :src="
                        value.image_hash
                          ? 'https://fuss10.elemecdn.com/' +
                            value.image_hash.slice(0, 1) +
                            '/' +
                            value.image_hash.slice(1, 3) +
                            '/' +
                            value.image_hash.slice(3) +
                            '.jpeg'
                          : ''
                      "
                    />
                  </li>
                </ul>
                <ul id="ul6">
                  <li v-for="(value, index) in v.item_ratings" :key="index">
                    <span>{{ value.food_name }}</span>
                  </li>
                </ul>
              </section>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
    <section id="section2">
      <van-popup
        v-model="show"
        :style="{ height: '30%', width: '100%' }"
        id="van-popup1"
      >
        <header id="header2">
          <h4>购物车</h4>
          <div @click="eliminate">
            <i class="iconfont icon-lajixiang"></i>
            <span>清空</span>
          </div>
        </header>
        <ul id="ul7" v-show="isshow3">
          <li v-for="(v, i) in Cart" :key="i">
            <div>
              <p>{{ v.name }}</p>
            </div>
            <div>
              ￥<span>{{ v.price }}</span>
            </div>
            <section>
              <input type="submit" value="-" />
              <span>{{ v.SpanNum }}</span>
              <input type="submit" value="+" />
            </section>
          </li>
        </ul>
      </van-popup>
      <div id="div1" @click="showPopup">
        <div>
          <i class="iconfont icon-gouwucheman"></i>
          <span v-show="isshow2" id="numz">0</span>
        </div>
        <div>
          <p>￥<span id="zj">0</span></p>
          <p>配送费￥5</p>
        </div>
      </div>
      <div id="div2">
        <p v-show="!isshow2">还差￥20元起送</p>
        <p class="color1" @click="Jump" v-show="isshow2">去结算</p>
      </div>
    </section>
  </div>
</template>

<script>
import { Tab, Tabs, Rate, Popup } from "vant";
export default {
  name: "shop",
  components: {
    "van-tabs": Tabs,
    "van-tab": Tab,
    "van-rate": Rate,
    "van-popup": Popup,
  },
  data() {
    return {
      geohash: "",
      id: "",
      datas: "",
      tips: "",
      num: "",
      menu: "",
      selectIndex: 0,
      num1: 0,
      isshow: false,
      isshow2: false,
      isshow3: true,
      isshow4: true,
      value: 3,
      tags: "",
      scores: "",
      percentage: "",
      ratings: "",
      food_score: "",
      overall_score: "",
      show: false,
      Cart: "",
    };
  },
  mounted() {
    //总价
    console.log(this.Cart);
    let Zprices = 0;
    let numz = 0;
    this.Cart.forEach(function (v) {
      // console.log(v);
      Zprices += (v.SpanNum - 0) * (v.price - 0);
      numz += v.SpanNum;
    });
    console.log(Zprices);
    console.log(numz);
    window.document.getElementById("zj").innerHTML = Zprices;
    window.document.getElementById("numz").innerHTML = numz;
    if (window.document.getElementById("zj").innerHTML == 0) {
      this.isshow2 = false;
    } else {
      this.isshow2 = true;
    }
    for (var i = 0; i < this.Cart; i++) {
      console.log(111);
      console.log(this.Cart[i].id);
    }
  },
  created() {
    this.geohash = localStorage.getItem("a");
    console.log(this.geohash);
    console.log(this.$route.query.id);
    this.id = this.$route.query.id;
    //购物车
    this.Cart = JSON.parse(localStorage.getItem(`${this.id}`));

    console.log(this.Cart);
    this.axios.get(`/shopping/restaurant/${this.id}`).then((data) => {
      console.log(data.data);
      this.datas = data.data;
      this.tips = data.data.piecewise_agent_fee.tips;
      this.num = data.data.supports.length;
    });
    this.axios
      .get("/shopping/v2/menu", { params: { restaurant_id: this.id } })
      .then((data) => {
        // console.log(data.data[1].foods)
        this.menu = data.data;
        console.log(this.menu[0].foods);
      });
    this.axios
      .get(`/ugc/v2/restaurants/${this.id}/ratings/tags`)
      .then((data) => {
        console.log(data.data)
        this.tags = data.data;
      });
    this.axios
      .get(
        `https://elm.cangdu.org/ugc/v2/restaurants/${this.id}/ratings/scores`
      )
      .then((data) => {
        // console.log(data.data)
        this.scores = data.data.service_score.toFixed(1);
        this.percentage = Number(data.data.compare_rating * 100).toFixed(1);
        this.food_score = data.data.food_score.toFixed(1);
        this.overall_score = data.data.overall_score.toFixed(1);
      });
    this.axios
      .get(`https://elm.cangdu.org/ugc/v2/restaurants/${this.id}/ratings`)
      .then((data) => {
        // console.log(data.data)
        this.ratings = data.data;
      });
  },
  methods: {
    eliminate() {
      localStorage.removeItem(`${this.id}`);
      this.isshow3 = false;
      this.isshow2 = false;
      this.isshow4 = !this.isshow4;
      window.document.getElementById("zj").innerHTML = 0;
    },
    showPopup() {
      this.show = true;
    },
    change(i) {
      this.selectIndex = i;
    },
    Jump() {
      this.$router.push({
        path: "/confirmOrder",
        query: { geohash: this.geohash, shopId: this.id },
      });
    },
    add(id, name, price, num) {
      if (num - 0) {
        // console.log(id,name,price);
        this.isshow3 = true;
        this.isshow2 = true;
        let SpanNum = window.document.getElementById("price" + id);
        window.document.getElementById("price" + id).innerHTML =
          SpanNum.innerHTML - 0 + 1;
        // console.log(SpanNum.innerHTML);
        if (SpanNum.innerHTML > 0) {
          this.isshow = true;
          console.log(this.$refs[`l${id}`][0]);
          this.$refs[`l${id}`][0].style.display = "inline-block";
          this.$refs[`${id}`][0].style.display = "inline-block";
        }
        //商品id
        // console.log(id);
        //商品名称
        // console.log(name);
        //商品价格
        // console.log(price);

        let commodity = JSON.parse(localStorage.getItem(`${this.id}`));
        if (commodity == null) {
          //不存在就建立一个新的数组（第一次进入浏览器肯定是不存在的）
          let loc = new Array();
          loc.push({
            id: id,
            name: name,
            price: price,
            SpanNum: SpanNum.innerHTML - 0,
          });
          localStorage.setItem(`${this.id}`, JSON.stringify(loc)); //转为对象
        } else {
          //存在就直接添加到数组头部unshift
          commodity.unshift({
            id: id,
            name: name,
            price: price,
            SpanNum: SpanNum.innerHTML - 0,
          });
          localStorage.setItem(`${this.id}`, JSON.stringify(commodity)); //转为对象

          let result = []; //保存去重后的数据
          let obj = {}; //保存去重后的数据里的对象
          for (let i = 0; i < commodity.length; i++) {
            if (!obj[commodity[i].id]) {
              result.push(commodity[i]);
              obj[commodity[i].id] = true;
            }
          }
          commodity = result;
          localStorage.setItem(`${this.id}`, JSON.stringify(commodity)); //转为对象
        }
        commodity = JSON.parse(localStorage.getItem(`${this.id}`));
        this.Cart = commodity;
        console.log(commodity);
        //总价
        let Zprices = 0;
        let numz = 0;
        commodity.forEach(function (v) {
          // console.log(v);
          Zprices += (v.SpanNum - 0) * (v.price - 0);
          numz += v.SpanNum;
        });
        console.log(Zprices);
        window.document.getElementById("zj").innerHTML = Zprices;
        window.document.getElementById("numz").innerHTML = numz;
        if (window.document.getElementById("zj").innerHTML == 0) {
          this.isshow2 = false;
        } else {
          this.isshow2 = true;
        }
      } else {
        //下面是减号的操作
        // console.log(id, name, price);
        let SpanNum = window.document.getElementById("price" + id);
        window.document.getElementById("price" + id).innerHTML =
          SpanNum.innerHTML - 0 - 1;
        // console.log(SpanNum.innerHTML);
        if (SpanNum.innerHTML == 0) {
          this.isshow = false;
          this.$refs[`l${id}`][0].style.display = "none";
          this.$refs[`${id}`][0].style.display = "none";
        }
        //商品id
        // console.log(id);
        //商品名称
        // console.log(name);
        //商品价格
        // console.log(price);

        let commodity = JSON.parse(localStorage.getItem(`${this.id}`));
        if (commodity == null) {
          //不存在就建立一个新的数组（第一次进入浏览器肯定是不存在的）
          let loc = new Array();
          loc.push({
            id: id,
            name: name,
            price: price,
            SpanNum: SpanNum.innerHTML - 0,
          });
          localStorage.setItem(`${this.id}`, JSON.stringify(loc)); //转为对象
        } else {
          //存在就直接添加到数组头部unshift
          commodity.unshift({
            id: id,
            name: name,
            price: price,
            SpanNum: SpanNum.innerHTML - 0,
          });
          localStorage.setItem(`${this.id}`, JSON.stringify(commodity)); //转为对象

          let result = []; //保存去重后的数据
          let obj = {}; //保存去重后的数据里的对象
          for (let u = 0; u < commodity.length; u++) {
            if (!obj[commodity[u].id]) {
              result.push(commodity[u]);
              obj[commodity[u].id] = true;
            }
          }
          commodity = result;
          localStorage.setItem(`${this.id}`, JSON.stringify(commodity)); //转为对象
        }
        commodity = JSON.parse(localStorage.getItem(`${this.id}`));
        this.Cart = commodity;
        console.log(commodity);
        //总价
        let Zprices = 0;
        let numz = 0;
        commodity.forEach(function (v) {
          // console.log(v);
          Zprices += (v.SpanNum - 0) * (v.price - 0);
          numz += v.SpanNum;
        });
        console.log(Zprices);
        window.document.getElementById("zj").innerHTML = Zprices;
        window.document.getElementById("numz").innerHTML = numz;
        if (window.document.getElementById("zj").innerHTML == 0) {
          this.isshow2 = false;
        } else {
          this.isshow2 = true;
        }
      }
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
  padding: 0px 10px 0px 10px;
  a {
    color: rgb(255, 255, 255);
    font-size: 1.2rem;
  }
}
.div1 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.6rem;
  div:nth-child(1) {
    img {
      width: 100px;
    }
  }
  div:nth-child(2) {
    width: 200px;
    overflow: hidden;
    h4 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 200px;
    }
    p {
      margin-top: 1rem;
    }
  }
}
.div2 {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  ul {
    display: flex;
    li {
      margin-right: 0.6rem;
      span:nth-child(1) {
        color: red;
      }
    }
  }
}
.sss {
  background-color: white;
  border-left: 5px solid red;
}
#ul1 {
  background-color: #f7f8fa;
  width: 35%;
  height: 400px;
  overflow: scroll;
  li {
    height: 33px;
    padding: 1.2rem 0.4rem;
  }
}

#van-tab1 {
  display: flex;
  #ul2 {
    width: 60%;
    height: 350px;
    overflow: scroll;
    div {
      header {
        background-color: #e6e6e6;

        span:nth-child(1) {
          font-size: 1.2rem;
        }
      }
      li {
        padding: 0.4rem 0.4rem;
        margin-bottom: 1rem;

        #section1 {
          display: flex;
          justify-content: space-around;

          section:nth-child(1) {
            img {
              width: 51px;
            }
          }

          section:nth-child(2) {
            p {
              font-size: 0.7rem;
              color: #999;
            }
          }
        }

        footer {
          section {
            display: inline-block;
          }

          section:nth-child(2) {
            float: right;
            div {
              display: inline-block;
              input {
                display: none;
              }
              span {
                display: none;
              }
            }
            input {
              background-color: #0092e8;
              border-radius: 5rem;
              color: white;
              width: 25px;
            }
          }
        }
      }
    }
  }
}
#section2 {
  display: flex;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 60px;
  van-popup {
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
  #header2 {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 1rem 0.4rem 1rem;
    font-size: 1.2rem;
    color: #666;
    background-color: #ebeff1;
    height: 50px;
    line-height: 50px;
  }
  #ul7 {
    li {
      display: flex;
      justify-content: space-between;
      padding: 1rem 0.8rem 1rem 0.8rem;
      div:nth-child(1) {
        p {
          font-size: 1.2rem;
          color: #666;
          font-weight: 800;
        }
      }
      div:nth-child(2) {
        color: #ff6600;
        font-weight: 800;
      }
      section {
        input:nth-child(1) {
          background-color: #fff;
          border-radius: 2rem;
          border: 1px solid blue;
          width: 23px;
          height: 23px;
          font-size: 2rem;
          color: blue;
          line-height: 23px;
          margin-right: 1rem;
        }

        input:nth-child(3) {
          background-color: #0092e8;
          border-radius: 2rem;
          width: 23px;
          height: 23px;
          font-size: 2rem;
          color: #fff;
          line-height: 23px;
          margin-left: 1rem;
        }
      }
    }
  }
  .van-popup--center {
    top: 77%;
  }
  #div1 {
    width: 70%;
    background-color: #666666;
    position: relative;
    z-index: 9999;
    div:nth-child(1) {
      width: 61px;
      height: 61px;
      border-radius: 5rem;
      background-color: #586dda;
      position: absolute;
      left: 30px;
      top: -20px;
      .van-icon van-icon-arrow van-cell__right-icon {
        display: none;
      }
      i {
        font-size: 40px;
        line-height: 61px;
        margin-left: 10px;
      }
      span {
        position: absolute;
        background-color: #ff2e00;
        color: #fff;
        padding: 0.2rem;
        border-radius: 5rem;
        width: 20px;
        text-align: center;
      }
    }
    div:nth-child(2) {
      width: 150px;
      margin-left: 100px;
      p {
        color: #ffffff;
      }
      p:nth-child(1) {
        font-size: 1.5rem;
        margin-bottom: 0.2rem;
        span {
          font-size: 1.5rem;
          color: #ffffff;
        }
      }
    }
  }
  #div2 {
    width: 30%;
    background-color: #535356;
    p {
      font-size: 1.2rem;
      text-align: center;
      line-height: 60px;
    }
  }
}
#header1 {
  display: flex;
  justify-content: space-around;
  padding: 0.8rem;
  border: 1px solid #999;
  section:nth-child(1) {
    p {
      text-align: center;
    }
    p:nth-child(1) {
      font-size: 1.6rem;
      color: #ff6901;
      text-align: center;
    }
    p:nth-child(3) {
      font-size: 0.6rem;
    }
  }
  section:nth-child(2) {
    p {
      span:nth-child(1) {
        margin-right: 0.4rem;
      }
    }
    p:nth-child(1) {
      span:nth-child(3) {
        color: #f60;
      }
    }
    p:nth-child(2) {
      span:nth-child(3) {
        color: #f60;
      }
    }
    p:nth-child(3) {
      span:nth-child(2) {
        font-size: 0.8rem;
        color: #999;
      }
    }
  }
}
#ul3 {
  display: flex;
  flex-wrap: wrap;
  padding: 0.7rem;
  li {
    margin-right: 0.7rem;
    margin-bottom: 0.35rem;
    padding: 0.45rem;
    background-color: #e8f5ff;
  }
}
#ul4 {
  li {
    margin-bottom: 2rem;
    #img1 {
      width: 38px;
      vertical-align: top;
      border-radius: 1rem;
    }
    #section3 {
      width: 85%;
      margin-left: 1rem;
      display: inline-block;
      #header2 {
        display: flex;
        justify-content: space-between;
      }
      #ul5 {
        display: flex;
        li {
          img {
            width: 77px;
          }
        }
      }
    }
  }
}
.color1 {
  background-color: #00dc6e;
}
@import "http://at.alicdn.com/t/font_2878927_ksy36h39szo.css";
</style>
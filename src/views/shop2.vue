<template>
  <div class="shop2">
    <div>
      <div id="div1">
        <input type="submit" value="-" ref="reduce" @click="reduce" />
        <span ref="num" id="num">0</span>
      </div>
      <input type="submit" value="+" ref="add" @click="add($event)" />
      <input type="submit" value="123" ref="add" />
      <input type="submit" value="456" ref="add" />
    </div>
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup
      v-model="show"
      get-container="#div1"
      :style="{ height: '30%' }"
      closeable
    >
    </van-popup>
  </div>
</template>

<script>
import { Popup, Cell } from "vant";

export default {
  name: "shop2",
  data() {
    return {
      num: 0,
      numall: 0,
      show: false,
    };
  },
  components: {
    "van-popup": Popup,
    "van-cell": Cell,
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    /* add(v,name,price){
      console.log(v)
      var AugmentObj = window.document.getElementById("price"+v)
      window.document.getElementById("price"+v).innerHTML=AugmentObj.innerHTML-0+1
      console.log(AugmentObj.innerHTML)
      localStorage.setItem('GWprice',AugmentObj.innerHTML)
      this.GWprice=localStorage.getItem('GWprice')

      if(this.GWprice > 0){
        this.minus = true
      }
      //数量
      console.log(this.GWprice)
      // id
      console.log(v)
      // 商品名称
      console.log(name)
      //商品价格
      console.log(price)

      var Game_Data = JSON.parse(localStorage.getItem('locc'))
      if (Game_Data == null) {
        //不存在就建立一个新的数组（第一次进入浏览器肯定是不存在）
        var loc = new Array()
        loc.push({id:v,name:name,price:price,GWprice:this.GWprice})
        localStorage.setItem('locc', JSON.stringify(loc))//转为对象
      } else {
        //存在就直接添加到数组头部unshift
        Game_Data.unshift({id:v,name:name,price:price,GWprice:this.GWprice})
        localStorage.setItem('locc', JSON.stringify(Game_Data))//转为对象

        var result = [];//保存去重后的数据
        var obj = {};
        for (var i = 0; i < Game_Data.length; i++) {
          if (!obj[Game_Data[i].id]) {
            result.push(Game_Data[i]);
            obj[Game_Data[i].id] = true;
          }
        }
        Game_Data = result
        localStorage.setItem('locc', JSON.stringify(Game_Data))//转为对象


      }
      Game_Data = JSON.parse(localStorage.getItem('locc'))
      console.log(Game_Data)
      //总价
      var Zprices = 0

      Game_Data.forEach(function (v) {
        console.log(v)
        Zprices+= (v.GWprice-0) * (v.price-0)
      })
      console.log(Zprices)
      window.document.getElementById('zj').innerHTML =Zprices
    }, */
    add(e) {
      e.target.parentElement.firstElementChild.style.display = "block";
      console.log(this.$refs.add);
    },
    reduce(e) {
      this.$refs.num.innerHTML--;
      if (this.$refs.num.innerHTML == 0) {
        e.target.parentElement.parentElement.firstElementChild.style.display =
          "none";
      }
    },
  },
  created() {},
  mounted() {
    /*console.log(this.$refs.reduce,this.$refs.num)
    let aaa = this.$refs.reduce;
    console.log(aaa.value)
    console.log(this.$refs.num.innerHTML)
    this.$refs.reduce.onclick=function (){
      this.numall++
    }
    this.$refs.reduce.onclick=function (){
      this.numall--
    }*/
  },
};
</script>

<style scoped lang="less">
#div1 {
  display: none;
  display: inline-block;
}
</style>
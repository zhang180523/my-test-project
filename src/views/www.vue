<template>
  <div class="www">
    <router-view></router-view>
  <tabbar :items="items"></tabbar>
  </div>
</template>

<script>
import tabbar from '../components/tabbar';
export default {
  name: "www",
  components:{
    tabbar
  },
  data(){
    return{
      items:[
        { icon: "iconfont icon-elemo", title: "外卖", to:{ name:"main" }},
        { icon: "iconfont icon-sousuoremensousuo", title: "搜索", to:{ name:"search" }},
        { icon: "iconfont icon-dingdan", title: "订单", to:{ name:"order" }},
        { icon: "iconfont icon-wode", title: "我的", to:{ name:"mine" }},
      ],
      judge:'true',
      rout:'',
    }
  },
  methods:{

  },
  created() {
    // console.log(this.$route.path.split('/')[2])
    // let rout = this.$route.path.split('/')[2]
    // if(rout == 'msite'){
    //   this.judge = 'true';
    // }else if(rout == 'search'){
    //   this.judge = 'false';
    // }else if(rout == 'order'){
    //   this.judge = 'false';
    // }else if(rout == 'mine'){
    //   this.judge = 'false';
    // }
    // console.log(this.judge)
  }
}
</script>

<style scoped lang="less">
@import "http://at.alicdn.com/t/font_2878927_ab8n3bbudom.css";
</style>
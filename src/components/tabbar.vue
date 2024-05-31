<template>
  <div class="tabBar">
    <div
      :class="{ bar: true, active: active == i }"
      v-for="(v, i) in items"
      :key="i"
      @click="changeBar(i)"
    >
      <i :class="v.icon"></i>
      <p>{{ v.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  props: ["items"],
  components: {},
  data() {
    return {
      active: 0,
      paths: ["/www/msite", "/www/search", "/www/order", "/www/mine"],
    };
  },
  methods: {
    changeBar(index) {
      this.$router.push({
        path: this.paths[index],
        query: {
          geohash: this.$route.query.geohash,
        },
      });
      this.active = index;
      console.log(this.active);
    },
  },
  created() {},
};
</script>

<style scoped lang="less">
.tabBar {
  height: 44px;
  background-color: #cccccc;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 999;

  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 10px 0px;
  .bar {
    text-align: center;
    .iconfont {
      font-size: 20px;
    }
    p {
      font-size: 16px;
    }
  }
  .active {
    .iconfont {
      color: red;
    }
    p {
      color: red;
    }
  }
}
</style>
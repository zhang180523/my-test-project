import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// 路由点击多次会报错，解决方式，重新路由
// 获取原始数据
let originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(error => { error });
}

let originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location) {
  return originalReplace.call(this, location).catch(error => { error });
}

const routes = [
  {
    path: "/",
    redirect: "home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "/login", name: "login", component: () => import("../views/login") },
  { path: "/forget", name: "forget", component: () => import("../views/forget") },
  { path: "/city/:id", name: "city", component: () => import("../views/city") },
  { path: "/food", name: "food", component: () => import("../views/food") },
  { path: "/shop", name: "shop", component: () => import("../views/shop") },
  { path: "/shop2", name: "shop2", component: () => import("../views/shop2") },
  { path: "/profile", name: "profile", component: () => import("../views/profile") },
  { path: "/add", name: "add", component: () => import("../views/add") },
  { path: "/wasd", name: "wasd", component: () => import("../views/wasd") },
  { path: "/balance", name: "balance", component: () => import("../components/balance") },
  { path: "/benefit", name: "benefit", component: () => import("../components/benefit") },
  { path: "/points", name: "points", component: () => import("../components/points") },
  { path: "/vipcard", name: "vipcard", component: () => import("../components/vipcard") },
  { path: "/service", name: "service", component: () => import("../components/service") },
  { path: "/address1", name: "address1", component: () => import("../views/address1") },
  { path: "/confirmOrder", name: "confirmOrder", component: () => import("../views/confirmOrder") },
  {
    path: "/www", name: "www", component: () => import("../views/www"),
    children: [
      { path: "msite", name: "main", component: () => import("../views/homepage") },
      { path: "search", name: "search", component: () => import("../views/search") },
      { path: "order", name: "order", component: () => import("../views/order") },
      { path: "mine", name: "mine", component: () => import("../views/mine") },
    ]
  },

];

const router = new VueRouter({
  routes,
});

export default router;

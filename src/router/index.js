import Vue from "vue";
import VueRouter from "vue-router";
import messageRoute from "./message";
import addressRoute from "./address";
import minerRoute from "./miner";
import expertsRoute from "./experts";
import statsRoute from "./stats";
import NoResult from "../views/no-result/NoResult.vue";
import NotFound from "../views/404/404.vue";
import About from "../views/about";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/home/Home.vue")
  },
  {
    path: "/tipset",
    name: "tipset",
    component: () =>
      import(/* webpackChunkName: "Tipset" */ "../views/tipset/Tipset.vue")
  },
  {
    path: "/no-result",
    name: "noResult",
    component: NoResult,
    props: true
  },
  ...messageRoute,
  ...addressRoute,
  ...minerRoute,
  ...statsRoute,
  ...expertsRoute,
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});
/**
 * 解决报错问题：报错显示是路由重复
 * Error: Avoided redundant navigation to current location
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.afterEach(() => {
  window.scrollTo(0, 0);
});
export default router;

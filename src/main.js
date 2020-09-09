import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./components/index";
import "reset-css";
import mixin from "./mixins/index";
import echarts from "./chart";
import i18n from "./i18n";
// import "@/assets/style/main.scss";s
Vue.config.productionTip = false;
Vue.prototype.$chart = echarts;

Vue.prototype.changeLang= ()=>{
  // if (this.$i18n.locale === lang) return false;
  if (i18n.locale === "en") {
    i18n.locale = "zh"; //关键语句
  } else if (i18n.locale === "zh") {
    i18n.locale = "en"; //关键语句
  }
},
Vue.mixin(mixin);
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

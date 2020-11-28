// @ts-nocheck

import Vue from "vue";
import App from "./App.vue";
// 引入router
import router from "./router";
// 引入公共样式
import "./style/reset.css";
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");

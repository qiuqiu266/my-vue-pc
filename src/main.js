// @ts-nocheck

import Vue from "vue";
import App from "./App.vue";
// 引入router
import router from "./router";
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");

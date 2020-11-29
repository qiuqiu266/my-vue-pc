// @ts-nocheck

import Vue from "vue";
import App from "./App.vue";
// 引入router
import router from "./router";

// 引入公共样式
import "./style/reset.css";

import './plugins/element.js'
Vue.config.productionTip = false;

// console.log(router);// __proto__有个push (实例上)

new Vue({ 
  render: (h) => h(App),
  router,
}).$mount("#app");

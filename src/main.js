// @ts-nocheck

import Vue from "vue";
import App from "./App.vue";

// 引入router
import router from "./router";
// 引入stoer
import store from "@store";

// 引入公共样式
import "./style/reset.css";
// 引入字体图标样式
import "./style/iconfont.css";
// 引入swiper样式
import "swiper/swiper-bundle.min.css";

// 引入mockServer 为了加载里面的代码
// 一旦加载就会启动mock服务器，就会拦截相应的请求
import "./mock/mockServer";

import "./plugins/element.js";
import './plugins/lazyload.js'

Vue.config.productionTip = false;

// console.log(router);// __proto__有个push (实例上)

new Vue({
  beforeCreate() {
    // 绑定全局事件总线
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");

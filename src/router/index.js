// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";
// 引入路由组件
import Home from "../visews/Home";
import Search from "../visews/Search";
import Login from "../visews/Login/";
import Register from "../visews/Register/";

// 安装使用插件
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      name: "search",
      // ？ 代表params 参数是可选的 (可以有值或没值)
      path: "/search/:searchText?",
      component: Search,
    },
    {
      path: "/login",
      component: Login,
      meta: {
        isFooterHide: true,
      },
    },
    {
      path: "/register",
      component: Register,
      meta: {
        isFooterHide: true,
      },
    },
  ],
});

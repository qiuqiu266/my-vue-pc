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
      path: "/search",
      component: Search,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
  ],
});

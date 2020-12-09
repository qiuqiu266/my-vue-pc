// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@store/index";


// 路由组件懒加载
// 
const Home = () => import ("@views/Home");
const AddCartSuccess = () => import ("@views/AddCartSuccess");
const Search = () => import ("@views/Search");
const Login = () => import ("@views/Login");
const Register = () => import ("@views/Register");
const Detail = () => import ("@views/Detail");
const ShopCart = () => import ("@views/ShopCart");
const Pay = () => import ("@views/Pay");
const Center = () => import ("@views/Center");
const PaySuccess = () => import ("@views/PaySuccess");
const Trade = () => import ("@views/Trade");

// 引入路由组件
// import Home from "@views/Home";
// import Search from "@views/Search";
// import Login from "@views/Login";
// import Register from "@views/Register";
// import Detail from "@views/Detail";
// import ShopCart from "@views/ShopCart";
// import AddCartSuccess from "@views/AddCartSuccess";
// import Pay from "@views/Pay";
// import Center from "@views/Center";
// import PaySuccess from "@views/PaySuccess";
// import Trade from "@views/Trade";

// import { from } from "core-js/fn/array";
// 重写push和replace方案：为了编程式导航重复点击路径时不报错
/*VueRouter.prototype.push = function(location) {
  // 这样会造成location 重复被调用
  VueRouter.prototype.push.call(this,location)
}*/
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, onComplete, onAbort) {
  // 如果用户想处理失败，就处理 onComplete成功 onAbort失败
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort);
  }
  // 如果用户不处理失败，---------------------就给默认值，空函数
  return push.call(this, location, onComplete, () => {});
};
VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  // 如果用户想处理失败，就处理 onComplete成功 onAbort失败
  if (onComplete && onAbort) {
    return replace.call(this, location, onComplete, onAbort);
  }
  // 如果用户不处理失败，---------------------就给默认值，空函数
  return replace.call(this, location, onComplete, () => {});
};

// 安装使用插件
Vue.use(VueRouter);
// console.log(VueRouter.prototype); // 原型上的push 要在安装使用VueRouter插件之前重写push

const router = new VueRouter({
  routes: [
    // 首页
    {
      path: "/",
      component: Home,
    },
    // 搜索
    {
      // name:"" 命名路由
      name: "search",
      // ？ 代表params 参数是可选的 (可以有值或没值)
      path: "/search/:searchText?",
      component: Search,
    },
    // 登录
    {
      path: "/login",
      component: Login,
      // 当组件加载显示时，meat的参数会传到$route中
      // 当组件不加载显示时，meat的参数就不会传
      meta: {
        isFooterHide: true,
      },
    },
    // 注册
    {
      path: "/register",
      component: Register,
      meta: {
        isFooterHide: true,
      },
    },
    // 商品详情页/放大镜
    {
      name: "detail",
      path: "/detail/:id",
      component: Detail,
    },
    // 购物车
    {
      name: "shopcart",
      path: "/shopcart",
      component: ShopCart,
    },
    // 成功添加购物车
    {
      name: "addcartsuccess",
      path: "/addcartsuccess",
      component: AddCartSuccess,
      // 路由独享守卫
      // beforeEnter: (to, from, next) => {
      //   // 判断 是否是从购物车过来的，并且是有加入购物车操作
      //   if (from.name === "detail" && sessionStorage.getItem("cart")) {
      //     // 放行
      //     return next();
      //   }
      //   // 让其去购物车
      //   next("/shopcart");
      // },
    },
    // 我的订单
    {
      name: "center",
      path: "/center",
      component: Center,
    },
    // 订单提交成功
    {
      name: "pay",
      path: "/pay",
      component: Pay,
    },
    // 支付成功
    {
      name: "paysuccess",
      path: "/paysuccess",
      component: PaySuccess,
    },
    // 订单信息
    {
      name: "trade",
      path: "/trade",
      component: Trade,
    },
  ],
  // 每次路由跳转页面滚动条位置在最顶部
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});
// 需要进行权限验证的地址
const permissionPaths = ["/center", "/pay", "/trade"];
// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  // 判断路由地址是否包含需要权限的地址并且是未登录的
  if (permissionPaths.indexOf(to.path) > -1 && !store.state.user.token) {
    // 就让其去登录页面去登录
    return next("/login");
  }
  next();
});
export default router;

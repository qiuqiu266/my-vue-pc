import Vue from "vue";
import VueLazyload from "vue-lazyload";
import loading from "../assets/imgs/loading.gif";
/*
  图片懒加载
   1. npm i vue-lazyload
   2. 配置
      plugins/lazyload.js
   3. min.js 中引入
   4. 使用
     组件中将图片属性 :src 改成 v-lozy
*/
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: "dist/error.png",
  // loading:"../assets/imgs/loading.gif", //  不能当作图片解析，需要手动引入
  loading: loading, // 要加载的loading图片
  // attempt: 1,
});

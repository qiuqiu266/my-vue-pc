<template>
  <div id="app">
    <Header />
    <!-- 加载显示当前路由组件 -->
    <router-view></router-view>
    <!-- <Footer v-if="$route.path !== '/login' && $route.path !== '/register'" /> -->
    <Footer v-if="!$route.meta.isFooterHide" />
  </div>
</template>
<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  // 注册子级组件
  components: {
    Header,
    Footer,
  },
};
</script>
<style lang="less" scoped>
</style>
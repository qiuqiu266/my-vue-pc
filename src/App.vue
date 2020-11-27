<template>
  <div id="app">
    <Header />
    <Footer />
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
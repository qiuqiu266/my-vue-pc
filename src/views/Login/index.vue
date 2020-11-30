<template>
  <div>
    Login..
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
// 引入接口
import { reqLogin } from "@api/user";
export default {
  name: "Login",
  methods: {
    login() {
      reqLogin("13700000000", "1111111")
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>

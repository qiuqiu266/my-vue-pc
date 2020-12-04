<template>
  <div class="register">
    <!-- 头部第一行 -->
    <div class="register-top">
      <div class="register-container">
        <div class="register-left">
          <h3>注册新用户</h3>
        </div>
        <div class="register-right">
          <h3 class="go-login">我有账号，去 <a href="/login">登录</a></h3>
        </div>
        <!-- 注册表单 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
};
</script>

<style lang="less" scoped>
.register {
  & > .register-top {
    // background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
  }
}
.register-container {
  background-color: #eaeaea;
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  .register-left {
    float: left;
    padding:  10px;
    h3{
      font-size: 20px;
    }
  }
  .register-right {
    float: right;
    padding:  10px;
  }
}
// .register-top {
//   margin: 0 auto;
//   overflow: hidden;
//   background-color: ;
//   .center {
//     float: left;
//   }
// }
</style>

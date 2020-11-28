<template>
  <div class="header">
    <!-- 头部第一行 -->
    <div class="header-top">
      <div class="container">
        <div class="login-list">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <!-- 头部右侧导航 -->
        <div class="type-list">
          <a href="##">我的订单</a>
          <a href="##">我的购物车</a>
          <a href="##">我的尚品汇</a>
          <a href="##">尚品汇会员</a>
          <a href="##">企业采购</a>
          <a href="##">关注尚品汇</a>
          <a href="##">合作招商</a>
          <a href="##">商家后台</a>
        </div>
      </div>
    </div>
    <!-- 头部第二行 Search搜索 -->
    <div class="header-buttom">
      <h1 class="logo-area">
        <router-link class="logo" title="尚品汇" to="/">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="search-area">
        <form action="###" class="search-form">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
          />
          <button
            class="sui-btn btn-xlarge btn-dander"
            type="button"
            @click="search"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  //
  methods: {
    search() {
      this.$router.push("/search");
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  .login-list {
    float: left;

    p {
      float: left;
      margin-right: 10px;

      .register {
        border-left: 1px solid #b3aeae;
        padding: 0 5px;
        margin-left: 5px;
      }
    }
    span {
      margin-right: 4px;
    }
  }

  .type-list {
    float: right;

    a {
      padding: 0 10px;

      & + a {
        border-left: 1px solid #eaeaea;
      }
    }
  }
}
.header {
  & > .header-top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
  }

  // 头部第二行
  & > .header-buttom {
    overflow: hidden;
    // margin: 0 auto;
    width: 1200px;

    .logo {
      img {
        width: 175px;
        margin: 25px 45px;
      }
    }
  }

  .search-area {
    float: right;
    margin-top: 35px;

    .search-form {
      overflow: hidden;

      input {
        float: left;
        box-sizing: border-box;
        width: 490px;
        height: 32px;
        padding: 0px 4px;
        border: 2px solid #ea4a36;

        &:focus {
          outline: none;
        }
      }
      button {
        height: 32px;
        width: 68px;
        border: none;
         background-color: #ea4a36;
        color: #fff;
        float: left;
        cursor: pointer;

        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>

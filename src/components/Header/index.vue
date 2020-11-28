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
            v-model="searchText"
          />
          <!-- 去掉type="button" 时，点击搜索，路径出现问题，(原因是提交了表单)
               1.button 按钮如果没有type 那么在表单中 默认type就是submit，
                 此时就会提交表单，事件就是绑定在form表单上
                 @submit.prevent = "search"
              2. 不用form 表单
                 @click="search"
           -->
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
  data() {
    return {
      // input输入的内容
      searchText: "",
    };
  },
  // 方法
  methods: {
    // 搜索功能回调函数
    // search() {
    //   // 读取输入框内容
    //   const { searchText } = this;
    //   // params 传参
    //   const params = searchText ? `/${searchText}` : "";
    //   // 生成要跳转的路径
    //   const location = "/search" + params;
    //   // 路由跳转
    //   this.$router.push(location);
    // },
    search() {
      // 获取表单输入的 内容
      const { searchText } = this;
      // 编程式导航
      const location = {
        name: "search",
      };
      // 判断
      if (searchText) {
        location.params = {
          searchText,
        };
      }
      this.$router.push(location);
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
    span {
      margin-right: 4px;
    }
    p {
      float: left;
      margin-right: 10px;

      .register {
        border-left: 1px solid #b3aeae;
        padding: 0 5px;
        margin-left: 5px;
      }
    }
  }

  .type-list {
    float: right;

    a {
      padding: 0 10px;
      // text-decoration: none;

      & + a {
        border-left: 1px solid #b3aeae;
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

  & > .header-buttom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logo-area {
      float: left;

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
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
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
}
</style>

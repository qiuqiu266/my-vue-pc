<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <ValidationProvider rules="required|length|phone" v-slot="{ errors }">
          <input
            type="text" 
            placeholder="请输入你的手机号"
            v-model="user.phone"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="user.code" />
        <img
          @click="refresh"
          ref="code"
          src="http://182.92.128.115/api/user/passport/code"
          alt="code"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="text"
          placeholder="请输入你的登录密码"
          v-model="user.password"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="text"
          placeholder="请输入确认密码"
          v-model="user.rePassword"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="user.isAgree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="btn">
        <button @click="registers">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
// console.log(111)
// import { mapActions } from "vuex";
/*
  1.下载
  npm i vee-validate
  2.引入组件并注册
  局部注册
  全局注册
  3. 使用
  用 ValidationProvider 包裹 需要表单验证的 表单项
  4.使用检验规则
  自定义规则
  extend("length",{
    validate(value){
      return value.length === 11;
    }
    messgae:"必须输入11位的手机号"
  })

  内置规则
  import {required,email} from 'vee-validate/dist/rules';
  extend("required",{
    ...required,
    message("手机号必须填写")
  })
*/

extend("required", {
  ...required,
  message: "手机号必须要填写", // 错误提示
});
extend("length", {
  validate(value) {
    // 验证手机号是否是11位数
    return value.length === 11;
  },
  message: "必须输入11位的手机号",
});
extend("phone", {
  validate(value) {
    // 手机号正则表达式
    return /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(
      value
    );
  },
  message: "手机号不符合规范",
});

export default {
  name: "Register",
  components: {
    ValidationProvider,
  },
  data() {
    return {
      user: {
        phone: "", // 手机号
        password: "", // 秘密
        rePassword: "", // 确认密码
        code: "", // 验证码
        isAgree: false, // 是否同意协议
      },
    };
  },
  // 方法
  methods: {
    // 注册
    async registers() {
      try {
        // 收集表单数据
        // console.log(this);
        const { phone, password, rePassword, code, isAgree } = this.user;
        // console.log(this.$message);
        // 判断是否勾选协议
        if (!isAgree) {
          // console.log(this);
          // console.log(this.message);
          this.$message.error("请您同意用户协议方可注册~");
          return;
        }
        // 判断密码是否一致
        if (password !== rePassword) {
          this.$message.error("两次密码输入不一致");
          return;
        }
        // 发送请求注册  注册成功后才会跳转到登录页面 所有需要加await
        await this.$store.dispatch("register", { phone, password, code });
        // console.log(phone, password, rePassword, isAgree, code);
        // 注册成功跳转到登录页面
        this.$router.push("/login");
      } catch {
        // 清空输入框手机号 密码
        this.user.phone = "";
        this.user.password = "";
        this.user.rePassword = "";
        // 重新刷新验证码
        this.refresh();
      }
    },
    // 刷新验证码
    refresh() {
      // e.target.src = "http://182.92.128.115/api/user/passport/code";
      this.$refs.code.src = "http://182.92.128.115/api/user/passport/code";
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
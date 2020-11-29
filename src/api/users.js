// 引入 请求，响应拦截器
import request from "@utils/request";

// 封装一个发送请求的函数
// 定义一个方法 并且暴露出去
// 登录的接口     参数 登录需要的信息 手机号 密码
export const reqLogin = (phone, password) => {
  // 将request的返回值返回出去
  // 外面可以接受到request返回值(Promise对象)，通过这个Promise对象可以判断请求成功还是失败
  return request({
    method: "POST",
    url: "/user/passport/login",
    data: { // 放置请求体参数，通常post请求
      phone,
      password,
    },
    params:{ //放置查询字符串参数，通常get请求
    }
  });
};

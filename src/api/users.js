// 引入 请求，响应拦截器
import request from "../utils/request";

// 封装一个发送请求的函数
export const reqLogin = (phone, password) => {
  return request({
    method: "POST",
    url: "/user/passport/login",
    data: {
      phone,
      password,
    },
  });
};

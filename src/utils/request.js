// 封装axios拦截器
import axios from "axios";
const instance = axios.create({
  baseURL: "/api",
});

// 设置请求拦截器
instance.interceptors.request.use((config) => {
  return config;
});
// 设置响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data.data;
    }
    // 功能失败，返回失败的Promise
    return Promise.reject(response.data.message);
  },
  // 响应失败
  (error) => {
    const message = error.message || "网络错误";
    return Promise.reject(message);
  }
);
export default instance;

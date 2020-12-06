// 封装axios拦截器
// 引入axios
import axios from "axios";
// 按需引入el{ement-ui
import { Message } from "element-ui";
import getUserTempId from "@utils/getUserTempId";
// 引入进度条插件
import NProgress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";

// const userTempId = getUserTempId();
// import { v4 as uuidv4 } from "uuid";
// uuidv4();
const instance = axios.create({
  baseURL: "/api",
  //请求参数 不能放在headers 中 ，
  // 对所有请求生效，将来登录时的请求不需要，
  // headers:{}
});

// 设置请求拦截器
// 可以接受两个参数，往往我们只需要一个参数即可
instance.interceptors.request.use(
  (config) => {
    // config 请求的配置对象
    // 将来发送请求(请求方式，请求地址，请求参数等) 都会在config中找

    // 进度条开始
    NProgress.start();
    // 修改config ，用来添加公共的请求参数
    const userTempId = getUserTempId();
    config.headers.userTempId = userTempId;
    return config;
  }
  // 初始化promise.resolve()返回默认成功的Promise，只会触发成功的回调，所以不需要第二个参数
  // () =>{},
);

// 设置响应拦截器
instance.interceptors.response.use(
  /*
    响应成功不是代表功能成功，只是代表有响应结果
    功能是否成功看 code 
    成功：200    失败：201 202
    返回一个具体为
    成功：成功的数据
    失败：失败的原因  的结果
    
    response 的数据结构：
    {
      headers:{},
      status:{},
      request:{},
      data:{响应的数据
      code:200,
      message:"成功"，
      data:{
        // 需要响应的数据  response.data.data
        nickName:"Administrator",
        name:"Admin",
        token:"90aa16f24d04c7d882051412f9ec45b"
      },
      ok:true
      },
    }

  */

  // 响应成功：当响应状态码为2xx
  (response) => {
    // 进度条结束
    NProgress.done();
    // 判断响应的code是否是200
    if (response.data.code === 200) {
      // 返回响应成功的数据
      return response.data.data;
    }
    // code不是200，功能失败-->触发，返回失败的Promise
    // 解构出来
    const { message } = response.data;
    // 提示信息
    Message.error(message);
    return Promise.reject(response.data.message);
    // return Promise.reject(response.data.message);
  },
  // 响应失败,当响应状态码不是2xx,
  (error) => {
    // 进度条结束
    NProgress.done();
    const message = error.message || "网络错误";
    // 提示信息
    Message.error(message);
    return Promise.reject(message);
  }
);
export default instance;

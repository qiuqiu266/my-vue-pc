import Mock from "mockjs";
import banners from "./rbanners.json";
import floors from "./rfloors.json";

// Mock.mock(请求的数据，请求方式，响应的和数据)
// 一旦运行就会拦截GET请求，请求地址为/mock/banners，并将最后的参数作为响应结果返回
Mock.mock("/mock/banners", "get", {
  code: 200,
  "data|4": banners,
});
// 楼层
Mock.mock("/mock/floors", "get", {
  code: 200,
  "data|3-5": floors,
});

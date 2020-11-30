import request from "@utils/request";
import mockRequest from "@utils/mockRequest";

// 侧边导航分类接口
export const reqCategoryList = () => {
  return request({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
};
// 获取轮播图数据 接口
export const reqGetBannerList = () => {
  return mockRequest({
    method: "GET",
    url: "/banners",
  });
};
// 获取楼层数据 接口
export const reqGetFloorList = () => {
  return mockRequest({
    method: "GET",
    url: "/floors",
  });
};
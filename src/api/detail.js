import request from "@utils/request";

// 获取所有商品
export const reqGetProductDetail = (id) => {
  return request({
    method: "GET",
    url: `/item/${id}`,
  });
};

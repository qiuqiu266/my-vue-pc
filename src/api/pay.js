import request from "@utils/request";

export default reqGetTrade = () => {
  return request({
    method: "GET",
    url: "/order/auth/trade",
  });
};

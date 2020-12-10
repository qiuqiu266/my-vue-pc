import request from "@utils/request";

// 不使用 vux ，直接去组件中国引入请求的方法
// 获取订单交易信息列表
export const reqGetTrade = () => {
  return request({
    method: "GET",
    url: "/order/auth/trade",
  });
};
// 提交订单
export const reqSubmitOrder = ({
  tradeNo,
  consignee,
  consigneeTel,
  deliveryAddress,
  paymentWay,
  orderComment,
  orderDetailList,
}) => {
  return request({
    method: "POST",
    url: `/order/auth/submitOrder`,
    params: {
      // query参数
      tradeNo,
    },
    data: {
      // body参数
      consignee,
      consigneeTel,
      deliveryAddress,
      paymentWay,
      orderComment,
      orderDetailList,
    },
  });
};
// 获取订单信息列表
export const reqGetQCode = (orderId) => {
  return request({
    method: "GET",
    url: `/payment/weixin/createNative/${orderId}`,
  });
};

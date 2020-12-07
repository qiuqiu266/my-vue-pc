import {
  reqGetCartList,
  reqUpdateCartCount,
  reqUpdateCartCheck,
  // reqDeleteCart,
} from "@api/shopcart";
export default {
  //状态数据
  state: {
    cartList: [], // 购物车所有商品列表
  },
  getters: {},
  actions: {
    // 更新所有购物车商品数据
    async getCartList({ commit }) {
      const cartList = await reqGetCartList();
      // 触发Mutations
      commit("GET_CART_LIST", cartList);
    },

    // 更新商品数量
    // actions 函数只能接受外面的一个参数
    // this.UpdateCatrtCheck(a,b) 第二个参数b  cations函数是接受不到的，所有要使用对象的方式{}
    async updateCartCount({ commit }, { skuId, skuNum }) {
      await reqUpdateCartCount(skuId, skuNum);
      // 触发Mutations

      commit("UPDATE_CART_COUNT", { skuId, skuNum });
      // console.log(commit);
    },

    // 选中商品
    async updateCartCheck({ commit }, { skuId, isChecked }) {
      // 发送请求---更新服务器
      await reqUpdateCartCheck(skuId, isChecked);
      // // 1.手动更新vuex 的数据---> 页面就会重新渲染
      // 2，重新请求所有购物车数据
      console.log(commit);
    },
  },

  mutations: {
    GET_CART_LIST(state, cartList) {
      state.cartList = cartList;
    },
    UPDATE_CART_COUNT(state, { skuId, skuNum }) {
      // 遍历所有数据
      state.cartList = state.cartList.map((cart) => {
        // 判断 id是否是当前点击添加或减少的 那个id 
        if (cart.skuId === skuId) {
          cart.skuNum += skuNum;
        }
        return cart;
      });
    },
  },
};

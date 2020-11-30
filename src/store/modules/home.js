// 引入接口
import { reqCategoryList } from "@api/home";
export default {
  // 所有的状态数据
  state: {
    // 初始化状态数据
    categoryList: [], //一级分类信息数据列表
  },
// 存储只读计算属性数据的函数对象
  getter: {},
  // 间接修改数据 (发送请求)
  actions: {
    // 获取首页三级分类信息列表
    async getCategoryList({ commit }) {
      const categoryList = await reqCategoryList();
      // 触发mutations函数
      commit("GET_CATEGORY_LIST", categoryList);
    },
  },
  // 直接修改数据(不做其他操作)
  mutations: {
    GET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
  },
};

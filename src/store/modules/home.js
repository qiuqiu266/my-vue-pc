// 引入接口
import { reqCategoryList, reqGetBannerList ,reqGetFloorList} from "@api/home";
export default {
  // 所有的状态数据
  state: {
    // 初始化状态数据
    categoryList: [], //一级分类信息数据列表
    bannerList: [], // 首页轮播图数据
    floorList: [], // 首页楼层数据
  },
  // 存储只读计算属性数据的函数对象
  getters: {},
  // 间接修改数据 (发送请求)
  actions: {
    // 获取首页三级分类信息列表
    async getCategoryList({ commit }) {
      const categoryList = await reqCategoryList();
      // 触发mutations函数
      commit("GET_CATEGORY_LIST", categoryList);
    },
    // 轮播图
    async getbannerList({ commit }) {
      const bannerList = await reqGetBannerList();
      // 触发mutations函数
      commit("GET_BANNER_LIST", bannerList);
    },
    // 楼层
    async getfloorList({ commit }) {
      const floorList = await reqGetFloorList();
      // 触发mutations
      commit("GET_FLOOR_lIST", floorList);
    },
  },
  // 直接修改数据(不做其他操作)
  mutations: {
    GET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    // 轮播图
    GET_BANNER_LIST(state, bannerList) {
      state.bannerList = bannerList;
    },
    // 楼层
    GET_FLOOR_lIST(state, floorList) {
      state.floorList = floorList;
    },
  },
};

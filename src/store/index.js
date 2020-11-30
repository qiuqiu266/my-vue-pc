import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
// 声明使用Vuex插件
Vue.use(Vuex);
const state = {};
const getter = {};
const actions = {};
const mutations = {};

// 暴露出去
export default new Vuex.Store({
  state,
  getter,
  actions,
  mutations,
  modules, // 其他vuex模块的数据汇总
});

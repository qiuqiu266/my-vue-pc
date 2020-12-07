import { reqLogin, reqRegister } from "@api/user";
export default {
  state: {},
  getters: {},
  actions: {
    // 注册
    async register({ commit }, { phone, password, code }) {
      await reqRegister({ phone, password, code });
      console.log(commit);
    },
    async login({ commit }, { phone, code }) {
      await reqLogin({ phone, code });
      console.log(commit);
    },
  },
  mutations: {},
};

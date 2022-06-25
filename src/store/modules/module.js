import jwtInterceptor from "src/helpers/jwtInterceptor";

const state = () => ({
  modules: [],
  module: {},
});
const getters = {
  getModules(state) {
    return state.modules;
  },
  getModule(state) {
    return state.module;
  },
};
const actions = {
  async fetchModules({ commit }, payload) {
    const response = await jwtInterceptor
      .get(`api/course/${payload.cId}/module`, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setModules", response.data.data);
      return true;
    } else {
      return false;
    }
  },
  async fetchModule({ commit }, payload) {
    const response = await jwtInterceptor
      .get(`api/course/${payload.cId}/module/${payload.mId}`, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setModule", response.data.data);
      return true;
    } else {
      return false;
    }
  },
};
const mutations = {
  setModules(state, data) {
    state.modules = [...data];
  },
  setModule(state, data) {
    state.module = data;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

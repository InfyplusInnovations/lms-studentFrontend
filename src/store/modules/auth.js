import jwtInterceptor from "../../helpers/jwtInterceptor";
const state = () => ({
  loginApiStatus: false,
  jwt: null,
});

const getters = {
  getLoginApiStatus(state) {
    return state.loginApiStatus;
  },
  getJWT(state) {
    return state.jwt;
  },
};

const actions = {
  async loginApi({ commit }, payload) {
    const response = await jwtInterceptor
      .post("api/login", payload, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setLoginApiStatus", true);
      commit("setJWTToken", response.data.token);
      return true;
    } else {
      commit("setLoginApiStatus", false);
      commit("setJWTToken", null);
      return false;
    }
  },
  async refreshAuth({ commit, state }) {
    const response = await jwtInterceptor
      .get("api/refresh", {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setLoginApiStatus", true);
      commit("setJWTToken", response.data.token);
    } else {
      commit("setLoginApiStatus", false);
      commit("setJWTToken", null);
    }
    return response;
  },
  async logoutApi({ commit, state }) {
    const response = await jwtInterceptor.get("api/logout").catch((err) => {
      console.log(err);
    });
    commit("setLoginApiStatus", false);
    commit("setJWTToken", null);
  },
};

const mutations = {
  setLoginApiStatus(state, data) {
    state.loginApiStatus = data;
  },
  setJWTToken(state, data) {
    state.jwt = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

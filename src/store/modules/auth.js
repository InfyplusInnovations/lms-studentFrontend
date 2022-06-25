import jwtInterceptor from "src/helpers/jwtInterceptor";
const state = () => ({
  loginApiStatus: false,
  jwt: null,
  loginLoading: false,
  registerLoading: false,
  error: false,
  cloudinary: `${process.env.CLOUDINARY_URL}`,
  user: {
    sId: 1,
    username: "admin",
    password: "marengo123",
    fullname: "Yedhukrishanan",
    class: "10",
    district: "Alappuzha",
  },
});

const getters = {
  getLoginApiStatus(state) {
    return state.loginApiStatus;
  },
  getJWT(state) {
    return state.jwt;
  },
  getError(state) {
    return state.error;
  },
  getUser(state) {
    return state.user;
  },
  getCloudinaryURL(state) {
    return state.cloudinary;
  },
};

const actions = {
  async loginApi({ commit, state }, payload) {
    commit("setError", false);

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
    commit("setError", false);
    localStorage.setItem("login", false);
    commit("setLoginApiStatus", localStorage.getItem("login"));
    return false;
  },
  async registerNewUser({ commit, state }, payload) {
    commit("setError", false);
    const response = await jwtInterceptor
      .post("api/register", payload, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("setError", false);
      return true;
    } else {
      commit("setError", true);
      return false;
    }
  },
};

const mutations = {
  setLoginApiStatus(state, data) {
    state.loginApiStatus = data;
  },
  setError(state, data) {
    state.error = data;
  },
  setJWTToken(state, data) {
    state.jwt = data;
  },
  setUserRegistration(state, data) {
    state.users.push(data);
  },
  setUserData(state, data) {
    state.user = data.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

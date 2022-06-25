import jwtInterceptor from "src/helpers/jwtInterceptor";
const state = () => ({
  user: {
    sId: 1,
    username: "admin",
    password: "marengo123",
    fullname: "Yedhukrishanan",
    class: "10",
    district: "Alappuzha",
  },
  loading: false,
  respnoseStatus: {
    error: false,
    msg: "",
  },
});
const getters = {
  getUser(state) {
    return state.user;
  },
  getResponseStatus(state) {
    return state.enrolledCourses;
  },
  getLoading(state) {
    return state.loading;
  },
};
const actions = {
  async fetchUser({ commit }) {
    commit("setLoading", true);
    let response = await jwtInterceptor
      .get("/api/profile", {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("setLoading", false);
      commit("setUserData", response.data);
      return true;
    } else {
      commit("setLoading", false);
      return false;
    }
  },
  async editUser({ commit }, payload) {
    commit("setLoading", true);
    let response = await jwtInterceptor
      .put("/api/profile", payload, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("setUserData", response.data);
      commit("setLoading", false);
      return true;
    } else {
      commit("setLoading", false);
      return false;
    }
  },
};
const mutations = {
  setUserData(state, data) {
    state.user = data.data;
  },
  setResponseStatus(state, data) {
    state.respnoseStatus = data;
  },
  setLoading(state, data) {
    state.loading = data;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

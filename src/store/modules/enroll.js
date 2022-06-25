import jwtInterceptor from "../../helpers/jwtInterceptor";
const state = () => ({
  loading: false,
  enrolls: [],
  enrolledCourses: [],
  respnoseStatus: {
    error: false,
    msg: "",
  },
});
const getters = {
  getEnrolls(state) {
    return state.enrolls;
  },
  getEnrolledCourses(state) {
    return state.enrolledCourses;
  },
  getResponseStatus(state) {
    return state.enrolledCourses;
  },
  getLoading(state) {
    return state.loading;
  },
  getEnrolledStatus: (state) => (cId) => {
    let course = state.enrolledCourses.filter((crs) => crs.cId == cId);
    if (course.length > 0) {
      return true;
    } else {
      return false;
    }
  },
};
const actions = {
  async startLoading({ commit }) {
    commit("setLoading", true);
  },
  async stopLoading({ commit }) {
    commit("setLoading", false);
  },

  async fetchEnrolls({ commit }) {
    const response = await jwtInterceptor
      .get("api/enroll", {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setEnrolls", response.data);
      commit("setEnrolledCourses", response.data.enrolledCourse);
      return true;
    } else {
      return false;
    }
  },
  async addEnroll({ commit }, payload) {
    const response = await jwtInterceptor
      .post("api/enroll", payload, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      return true;
    } else {
      return false;
    }
  },
};
const mutations = {
  setEnrolls(state, data) {
    state.enrolls = data.data;
  },
  setEnrolledCourses(state, data) {
    state.enrolledCourses = data;
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
  mutations,
  actions,
};

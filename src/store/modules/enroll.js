import jwtInterceptor from "../../helpers/jwtInterceptor";
const state = () => ({
  loading: false,
  enrolls: [],
  enroll: {},
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
  getEnroll(state) {
    return state.enroll;
  },
  getEnrolledCourses(state) {
    return state.enrolledCourses;
  },
  getResponseStatus(state) {
    return state.respnoseStatus;
  },
  getLoading(state) {
    return state.loading;
  },
  getEnrolledStatus: (state) => (cId) => {
    let course = state.enrolledCourses.filter((crs) => crs.cId == cId);
    let enroll = state.enrolls.filter((enrl) => enrl.cId == cId);
    if (course.length > 0) {
      return { status: true, eId: enroll[0].eId, payment: enroll[0].status };
    } else {
      return { status: false };
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
        commit("setError", err.response.data);
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
  setError(state, data) {
    state.respnoseStatus.error = true;
    console.log(data);
    if (data.status == "error") {
      state.respnoseStatus.msg = data.message;
    } else {
      state.respnoseStatus.msg = "Something went wrong";
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

import jwtInterceptor from "src/helpers/jwtInterceptor";
const state = () => ({
  syllabus: [],
  loading: false,
  respnoseStatus: {
    error: false,
    msg: "",
  },
});
const getters = {
  getSyllabus(state) {
    return state.syllabus;
  },
  getResponseStatus(state) {
    return state.enrolledCourses;
  },
  getLoading(state) {
    return state.loading;
  },
};

const actions = {
  async fetchSyllabus({ commit, state }, payload) {
    let response = await jwtInterceptor
      .get(`/api/syllabus/${payload.cId}`, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("setSyllabus", response.data.data);
    }
  },
};
const mutations = {
  setSyllabus(state, data) {
    state.syllabus = data;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

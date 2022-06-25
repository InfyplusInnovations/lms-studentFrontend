import jwtInterceptor from "src/helpers/jwtInterceptor";
const state = () => ({
  courses: [],
  course: null,
  loading: false,
  errMsg: "",
  courseCounts: {
    activeCourses: 0,
    allCourses: 0,
  },
});
const getters = {
  getCourses(state) {
    return state.courses;
  },
  getCourse(state) {
    return state.course;
  },
  getLoading(state) {
    return state.loading;
  },
  getCourseCounts(state) {
    return state.courseCounts;
  },
};
const actions = {
  async startLoading({ commit }) {
    commit("setLoading", true);
  },
  async stopLoading({ commit }) {
    commit("setLoading", false);
  },

  async fetchCourses({ commit }) {
    const response = await jwtInterceptor
      .get("api/course", {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setCourses", response.data.data);
      commit("setCourseCounts", response.data.count);
      return true;
    } else {
      return false;
    }
  },
  async fetchCourse({ commit }, payload) {
    const response = await jwtInterceptor
      .get(`api/course/${payload}`, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setCourse", response.data.data);
      return true;
    } else {
      return false;
    }
  },
};
const mutations = {
  setCourses(state, data) {
    state.courses = [...data];
  },
  setCourse(state, data) {
    state.course = data;
  },
  setLoading(state, data) {
    state.loading = data;
  },
  setCourseCounts(state, data) {
    console.log(data);
    state.courseCounts.activeCourses = data.active;
    state.courseCounts.allCourses = data.all;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

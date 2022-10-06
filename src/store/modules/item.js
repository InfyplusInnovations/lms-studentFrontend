import jwtInterceptor from "src/helpers/jwtInterceptor";
const state = () => ({
  lesson: undefined,
  module: undefined,
  course: {
    cName: "test",
  },
  category: undefined,
});
const getters = {
  getLesson(state) {
    return state.lesson;
  },
  getModule(state) {
    return state.module;
  },
  getCourse(state) {
    return state.course;
  },
  getCategory(state) {
    return state.category;
  },
};
const actions = {
  async fetchCategory({ commit }, payload) {
    let response = await jwtInterceptor
      .get(`api/category/${payload.catId}`)
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      // console.log(response.data.data);
      commit("setCategory", response.data.data);
      return true;
    } else {
      return false;
    }
  },
  async fetchLesson({ commit }, payload) {
    let response = await jwtInterceptor
      .get(
        `api/course/${payload.cId}/module/${payload.mId}/lesson/${payload.lId}`
      )
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("setLesson", response.data.data);
      return true;
    } else {
      return false;
    }
  },
  async fetchModule({ commit }, payload) {
    let response = await jwtInterceptor
      .get(`api/course/${payload.cId}/module/${payload.mId}`)
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
  async fetchCourse({ commit }, payload) {
    let response = await jwtInterceptor
      .get(`api/course/${payload.cId}`)
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
  setCourse(state, data) {
    state.course = data;
  },
  setModule(state, data) {
    state.module = data;
  },
  setLesson(state, data) {
    state.lesson = data;
  },
  setCategory(state, data) {
    state.category = data;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

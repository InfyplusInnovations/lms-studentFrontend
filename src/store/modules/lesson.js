import jwtInterceptor from "src/helpers/jwtInterceptor";
const state = () => ({
  lessons: [],
  lesson: {
    lName: "",
    lDescription: "",
    visibility: false,
    videoId: "",
    lThumbnail: "",
  },
  tempLesson: {
    lName: "",
    lDescription: "",
    visibility: false,
    videoId: "",
    lThumbnail: "",
    order: "",
  },

  loading: false,
  respnoseStatus: {
    error: false,
    msg: "",
  },
  lessonCounts: {
    activeLessons: 0,
    allLessons: 0,
  },
});
const getters = {
  getLessons(state) {
    return state.lessons;
  },
  getLesson(state) {
    return state.lesson;
  },
  getLoading(state) {
    return state.loading;
  },
  getLessonCounts(state) {
    return state.lessonCounts;
  },
  getResponseStatus(state) {
    return state.respnoseStatus;
  },
  getTempLesson(state) {
    return state.tempLesson;
  },
};
const actions = {
  async startLoading({ commit }) {
    commit("setLoading", true);
  },
  async stopLoading({ commit }) {
    commit("setLoading", false);
  },

  async fetchLessons({ commit }, payload) {
    const response = await jwtInterceptor
      .get(`api/course/${payload.cId}/module/${payload.mId}/lesson`, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setLessons", response.data.data);
      commit("setLessonCounts", response.data.count);
      return true;
    } else {
      return false;
    }
  },
  async fetchLesson({ commit }, payload) {
    const response = await jwtInterceptor
      .get(
        `api/course/${payload.cId}/module/${payload.mId}/lesson/${payload.lId}`,
        {
          withCredentials: true,
          credentials: "include",
        }
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
  async fetchTempLesson({ commit }, payload) {
    const response = await jwtInterceptor
      .get(
        `api/course/${payload.cId}/module/${payload.mId}/lesson/${payload.lId}`,
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setTempLesson", response.data.data);
      return true;
    } else {
      return false;
    }
  },
};
const mutations = {
  setLessons(state, data) {
    state.lessons = [...data];
  },
  setLesson(state, data) {
    state.lesson = data;
  },
  setLoading(state, data) {
    state.loading = data;
  },
  setLessonCounts(state, data) {
    state.lessonCounts.activeLessons = data.active;
    state.lessonCounts.allLessons = data.all;
  },
  setTempLesson(state, data) {
    state.tempLesson = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

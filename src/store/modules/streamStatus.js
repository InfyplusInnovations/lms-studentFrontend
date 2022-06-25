import jwtInterceptor from "../../helpers/jwtInterceptor";
const state = () => ({
  loading: false,
  streamStatus: { lId: "", sId: "", mId: "", cId: "", time: "" },
  stream: null,
  streamByCourse: {},
  responseStatus: {
    error: false,
    msg: "",
  },
  lessonStream: null,
});
const getters = {
  getStreamStatus(state) {
    return state.streamStatus;
  },
  getLatestStream(state) {
    return state.stream;
  },
  getResponseStatus(state) {
    return state.responseStatus;
  },
  getLoading(state) {
    return state.loading;
  },
  getLatestStreamByCourse(state) {
    return state.streamByCourse;
  },
  getLessonStream(state) {
    return state.lessonStream;
  },
};
const actions = {
  async fetchStream({ commit }) {
    const response = await jwtInterceptor
      .get("api/streamStatus", {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setStreamStatus", response.data);
      return true;
    } else {
      return false;
    }
  },
  async fetchLatestStream({ commit }) {
    const response = await jwtInterceptor
      .get(
        "api/streamStatus",
        { params: { latest: true } },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setLatestStream", response.data);
      return true;
    } else {
      return false;
    }
  },
  async fetchLatestStreamByCourse({ commit }, payload) {
    const response = await jwtInterceptor
      .get(
        `api/streamStatus/${payload.cId}`,
        { params: { course: true } },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setLatestStreamByCourse", response.data);
      return true;
    } else {
      return false;
    }
  },
  async addStream({ commit }, payload) {
    const response = await jwtInterceptor
      .put(
        `api/streamStatus`,
        payload,

        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setStreamStatus", response.data);
      return true;
    } else {
      return false;
    }
  },
  async updateStream({ commit }, payload) {
    const response = await jwtInterceptor
      .put(
        `api/streamStatus`,
        payload,

        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setStreamStatus", response.data);
      return true;
    } else {
      return false;
    }
  },
  async fetchSteamByLesson({ commit }, payload) {
    const response = await jwtInterceptor
      .get(
        "api/streamStatus",
        { params: { lId: payload.lId } },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setLessonStream", response.data);
      return true;
    } else {
      commit("setLessonStream", { data: null });
      return false;
    }
  },
};
const mutations = {
  setStreamStatus(state, data) {
    state.streamStatus = data.data;
  },
  setLatestStream(state, data) {
    state.stream = data.data;
  },
  setLatestStreamByCourse(state, data) {
    state.streamByCourse = data.data;
  },
  setResponseStatus(state, data) {
    state.respnoseStatus = data;
  },
  setLoading(state, data) {
    state.loading = data;
  },
  setLessonStream(state, data) {
    state.lessonStream = data.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

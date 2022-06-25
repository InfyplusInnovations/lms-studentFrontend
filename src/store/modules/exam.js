import jwtInterceptor from "src/helpers/jwtInterceptor";

const state = () => ({
  loading: false,
  exams: [],
  exam: {
    mId: "",
    time: 0,
    exId: "",
  },
  questions: [],
  answers: [],
  examLog: null,
  examResult: null,
});
const getters = {
  getExams: (state) => {
    return state.exams;
  },
  getExam(state) {
    return state.exam;
  },
  getQuestions(state) {
    return state.questions;
  },
  getAnswers(state) {
    return state.answers;
  },
  getExamLog(state) {
    return state.examLog;
  },
  getResult(state) {
    return state.examResult;
  },
};
const actions = {
  async fetchExams({ commit }, payload) {
    const response = await jwtInterceptor
      .get(
        `api/exam`,
        { params: { mId: payload } },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setExams", response.data.data);
      return true;
    } else {
      return false;
    }
  },
  async fetchExam({ commit }, payload) {
    const response = await jwtInterceptor
      .get(`api/exam/${payload}`, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setExam", response.data.data.exam);
      commit("setQuestions", response.data.data.questions);
      return true;
    } else {
      return false;
    }
  },
  async fetchAnswers({ commit }, payload) {
    const response = await jwtInterceptor
      .get(
        `api/exam/${payload.exId}/answer`,
        { params: { eLogId: payload.eLogId } },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("setAnswers", response.data.data);
      return true;
    } else {
      return false;
    }
  },
  async addAnswer({ commit }, payload) {
    const response = await jwtInterceptor
      .post(`api/exam/${payload.exId}/answer`, payload, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("addAnswers", response.data.data);
      return true;
    } else {
      return false;
    }
  },
  async updateAnswer({ commit }, payload) {
    const response = await jwtInterceptor
      .put(`api/exam/${payload.exId}/answer/${payload.ansId}`, payload, {
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
  async fetchExamLog({ commit }, payload) {
    const response = await jwtInterceptor
      .get(`api/exam/${payload}/status`, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setExamLog", response.data.data);
      return true;
    } else {
      return false;
    }
  },
  async startExam({ commit }, payload) {
    const response = await jwtInterceptor
      .post(`api/exam/${payload.exId}/status`, payload, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setExamLog", response.data.data);
      // commit("setQuestions", response.data.data.questions);
      return true;
    } else {
      return false;
    }
  },
  async endExam({ commit }, payload) {
    const response = await jwtInterceptor
      .put(`api/exam/${payload.exId}/status/${payload.eLogId}`, payload, {
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
  async examResult({ commit }, payload) {
    const response = await jwtInterceptor
      .get(
        `api/exam/${payload.exId}/status/${payload.eLogId}/result`,
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
      commit("setResult", response.data);
      return true;
    } else {
      return false;
    }
  },
  async resetExam({ commit }, payload) {
    const response = await jwtInterceptor
      .delete(`api/exam/${payload.exId}/status/${payload.eLogId}`, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("setExamLog", null);
      commit("setResult", null);
      commit("setAnswers", null);
      return true;
    } else {
      return false;
    }
  },
};
const mutations = {
  setExams(state, data) {
    state.exams = data.exam;
  },
  setExam(state, data) {
    state.exam = data;
  },
  setQuestions(state, data) {
    state.questions = [...data];
  },
  setExamLog(state, data) {
    state.examLog = data;
  },
  addAnswers(state, data) {
    state.answers.push(data);
  },
  setAnswers(state, data) {
    state.answers = data;
  },
  setResult(state, data) {
    state.examResult = data.data;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

import jwtInterceptor from "src/helpers/jwtInterceptor";

const state = () => ({
  responseStatus: {
    error: false,
    msg: "",
  },
});
const getters = {
  getResponseStatus(state) {
    return state.responseStatus;
  },
};
const actions = {
  async resetError({ commit, state }) {
    commit("setResponseStatus", { error: false, msg: "" });
  },
  async sendResetMail({ commit }, payload) {
    let response = await jwtInterceptor
      .post(`api/passwordReset`, payload)
      .catch((err) => {
        console.log(err);
        return err.response;
      });
    if (response && response.data) {
      if (response.status == 200) {
        commit("setResponseStatus", { error: false, msg: "success" });
        console.log("success");
        return true;
      } else {
        commit("setResponseStatus", {
          error: true,
          msg: response.data.message,
        });
        console.log("failed");
        return false;
      }
    } else {
      commit("setResponseStatus", { error: true, msg: "something went wrong" });

      return false;
    }
  },
  async checkLink({ commit }, payload) {
    let response = await jwtInterceptor
      .put(`api/passwordReset/${payload.reset}`, {})
      .catch((err) => {
        console.log(err);
        return err.response;
      });
    if (response && response.data) {
      if (response.status == 406) {
        commit("setResponseStatus", { error: false, msg: "success" });
        console.log("link valid");
        return true;
      } else {
        commit("setResponseStatus", {
          error: true,
          msg: response.data.message,
        });
        console.log("failed");
        return false;
      }
    } else {
      commit("setResponseStatus", {
        error: true,
        msg: "something went wrong",
      });
      return false;
    }
  },
  async setNewPassword({ commit }, payload) {
    let load = {
      newPassword: payload.password,
      confirmPassword: payload.confirmPass,
    };
    console.log(load);
    let response = await jwtInterceptor
      .put(`api/passwordReset/${payload.reset}`, load, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
    if (response && response.data) {
      if (response.status == 200) {
        commit("setResponseStatus", { error: false, msg: "success" });
        console.log("success");
        return true;
      } else {
        commit("setResponseStatus", {
          error: true,
          msg: response.data.message,
        });
        console.log("failed");
        return false;
      }
    } else {
      commit("setResponseStatus", { error: true, msg: "something went wrong" });
      return false;
    }
  },
};
const mutations = {
  setResponseStatus(state, data) {
    state.responseStatus = data;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

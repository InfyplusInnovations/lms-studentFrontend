import jwtInterceptor from "src/helpers/jwtInterceptor";
const state = () => ({
  loginApiStatus: false,
  jwt: null,
  loginLoading: false,
  registerLoading: false,
  usernameExists: false,
  emailExists: false,
  respnoseStatus: {
    error: false,
    msg: "",
  },
  cloudinary: `${process.env.CLOUDINARY_URL}`,
  user: {
    sId: 1,
    username: "admin",
    password: "marengo123",
    fullname: "Yedhukrishanan",
    class: "10",
    district: "Alappuzha",
  },
});

const getters = {
  getLoginApiStatus(state) {
    return state.loginApiStatus;
  },
  getJWT(state) {
    return state.jwt;
  },
  getResponseStatus(state) {
    return state.responseStatus;
  },
  getUser(state) {
    return state.user;
  },
  getCloudinaryURL(state) {
    return state.cloudinary;
  },
  getUserExists(state) {
    return state.usernameExists;
  },
  getEmailExists(state) {
    return state.emailExists;
  },
};

const actions = {
  async resetError({ commit, state }) {
    commit("setResponseStatus", { error: false, msg: "" });
  },
  async loginApi({ commit, state }, payload) {
    commit("setResponseStatus", { error: false, msg: "" });
    const response = await jwtInterceptor
      .post("api/login", payload, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
    if (response && response.data) {
      if (response.status !== 200) {
        commit("setResponseStatus", {
          error: true,
          msg: response.data.message,
        });
        return false;
      } else {
        commit("setLoginApiStatus", true);
        commit("setJWTToken", response.data.token);
        commit("setResponseStatus", { error: false, msg: "success" });
        localStorage.setItem("login", true);
        commit("setLoginApiStatus", localStorage.getItem("login"));
        return true;
      }
    } else {
      commit("setLoginApiStatus", false);
      commit("setJWTToken", null);
      commit("setResponseStatus", {
        error: true,
        msg: "something went wrong",
      });
      return false;
    }
  },
  async refreshAuth({ commit, state }) {
    const response = await jwtInterceptor
      .get("api/refresh", {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("setLoginApiStatus", true);
      commit("setJWTToken", response.data.token);
    } else {
      commit("setLoginApiStatus", false);
      commit("setJWTToken", null);
    }
    return response;
  },
  async logoutApi({ commit, state }) {
    const response = await jwtInterceptor
      .get("api/logout", {
        withCredentials: true,
        credentials: "include",
      })

      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("setError", false);
      localStorage.setItem("login", false);
      commit("setLoginApiStatus", localStorage.getItem("login"));
      return true;
    } else {
      localStorage.setItem("login", false);
      commit("setLoginApiStatus", localStorage.getItem("login"));
      return false;
    }
  },
  async registerNewUser({ commit, state }, payload) {
    commit("setResponseStatus", { error: false, msg: "" });
    const response = await jwtInterceptor
      .post("api/register", payload, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
    if (response && response.data) {
      if (response.status == 201) {
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
  async checkUsername({ commit, state }, payload) {
    const response = await jwtInterceptor
      .post(
        "api/checkUsername",
        { username: payload },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .catch((err) => {
        console.log(err);
        return err.response;
      });

    if (response && response.data) {
      if (response.status !== 200) {
        commit("setUsernameExists", true);
        return true;
      } else {
        commit("setUsernameExists", false);
        return false;
      }
    } else {
      commit("setUsernameExists", false);
      return false;
    }
  },
  async checkEmail({ commit, state }, payload) {
    const response = await jwtInterceptor
      .post(
        "api/checkEmail",
        { email: payload },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .catch((err) => {
        console.log(err);
        return err.response;
      });

    if (response && response.data) {
      if (response.status !== 200) {
        commit("setEmailExists", true);
        return true;
      } else {
        commit("setEmailExists", false);
        return false;
      }
    } else {
      commit("setEmailExists", false);
      return false;
    }
  },
};

const mutations = {
  setLoginApiStatus(state, data) {
    state.loginApiStatus = data;
  },
  setResponseStatus(state, data) {
    state.responseStatus = data;
  },
  setJWTToken(state, data) {
    state.jwt = data;
  },
  setUserRegistration(state, data) {
    state.users.push(data);
  },
  setUserData(state, data) {
    state.user = data.data;
  },
  setUsernameExists(state, data) {
    state.usernameExists = data;
  },
  setEmailExists(state, data) {
    state.emailExists = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

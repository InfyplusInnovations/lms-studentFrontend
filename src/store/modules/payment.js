import jwtInterceptor from "src/helpers/jwtInterceptor";

const state = () => ({
  loading: false,
  orderId: null,
  payable: null,
  respnoseStatus: {
    error: false,
    msg: "",
  },
});
const getters = {
  getOrderId(state) {
    return state.orderId;
  },
  getPayable(state) {
    return state.payable;
  },
  getResponseStatus(state) {
    return state.respnoseStatus;
  },
  getLoading(state) {
    return state.loading;
  },
};
const actions = {
  async placePayment({ commit }, payload) {
    const response = await jwtInterceptor
      .post(`api/payment/${payload.eId}`, payload, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("setResponseStatus", {
        error: false,
        msg: "success",
      });
      commit("setOrderId", response.data.order);
      commit("setPayable", response.data.order);
    } else {
      commit("setResponseStatus", {
        error: true,
        msg: "something went wrong",
      });
      return false;
    }
  },
  async completePayment({ commit }, payload) {
    const response = await jwtInterceptor
      .put(`api/payment/${payload.eId}`, payload, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      commit("setResponseStatus", {
        error: false,
        msg: "success",
      });
      return true;
    } else {
      commit("setResponseStatus", {
        error: true,
        msg: "something went wrong",
      });
      return false;
    }
  },
};
const mutations = {
  setOrderId(state, data) {
    state.orderId = data.id;
  },
  setPayable(state, data) {
    state.payable = data.amount / 100;
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
  actions,
  mutations,
};

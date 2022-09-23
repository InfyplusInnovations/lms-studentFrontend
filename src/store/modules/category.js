import jwtInterceptor from "src/helpers/jwtInterceptor";

const state = () => ({
  categories: [],

  category: {},
});
const getters = {
  getCategories(state) {
    return state.categories;
  },

  getCategory(state) {
    return state.category;
  },
};
const actions = {
  async fetchCategories({ commit }, payload) {
    const response = await jwtInterceptor
      .get(`api/category`, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setCategories", response.data.data);
      return true;
    } else {
      return false;
    }
  },
  async fetchCategory({ commit }, payload) {
    const response = await jwtInterceptor
      .get(`api/category/${payload.catId}`, {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        console.log(err);
      });

    if (response && response.data) {
      commit("setCategory", response.data.data);
      return true;
    } else {
      return false;
    }
  },
};
const mutations = {
  setCategories(state, data) {
    state.categories = [...data];
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

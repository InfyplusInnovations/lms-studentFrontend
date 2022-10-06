import jwtInterceptor from "src/helpers/jwtInterceptor";

const state = () => ({
  notes: [],
});
const getters = {
  getNotes(state) {
    return state.notes;
  },
};
const actions = {
  async fetchNotes({ commit }, payload) {
    const response = await jwtInterceptor
      .get(
        `api/note`,
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
      commit("setNotes", response.data.data);
      return true;
    } else {
      return false;
    }
  },
};
const mutations = {
  setNotes(state, data) {
    state.notes = [...data];
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

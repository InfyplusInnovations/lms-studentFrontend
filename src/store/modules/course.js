import jwtInterceptor from "../../helpers/jwtInterceptor";
const state = () => ({
  courses: [
    {
      cId: 1,
      cName: "Abacus 101",
      cDescription: "",
      cThumbnail: null,
      cPreview: "",
      cPrice: 10000,
      paymentTerm: "",
      visibility: false,
    },
  ],
  course: {},
});
const getters = {
  getCourses(state) {
    return state.courses;
  },
  getCourse(state) {
    return state.course;
  },
};
const actions = {
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
      commit("setCourses", response.data);
      return true;
    } else {
      return false;
    }
  },
};
const mutations = {
  setCourses(state, data) {
    state.courses = data;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

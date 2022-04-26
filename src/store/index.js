import { createStore } from "vuex";
import authModule from "./modules/auth";
import courseModule from "./modules/course";
const store = createStore({
  modules: {
    auth: authModule,
    course: courseModule,
  },
});

export default store;

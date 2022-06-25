import { createStore } from "vuex";
import authModule from "./modules/auth";
import courseModule from "./modules/course";
import enrollModule from "./modules/enroll";
import module from "./modules/module";
import lesson from "./modules/lesson";
import exam from "./modules/exam";
import streamStatus from "./modules/streamStatus";
import profile from "./modules/profile";
const store = createStore({
  modules: {
    auth: authModule,
    course: courseModule,
    enroll: enrollModule,
    exam,
    lesson,
    module,
    streamStatus,
    profile,
  },
});

export default store;

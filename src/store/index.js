import { createStore } from "vuex";
import authModule from "./modules/auth";
import courseModule from "./modules/course";
import enrollModule from "./modules/enroll";
import module from "./modules/module";
import lesson from "./modules/lesson";
import exam from "./modules/exam";
import streamStatus from "./modules/streamStatus";
import profile from "./modules/profile";
import category from "./modules/category";
import syllabus from "./modules/syllabus";
import payment from "./modules/payment";
import note from "./modules/note";
import forgot from "./modules/forgot";
import item from "./modules/item";
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
    category,
    syllabus,
    payment,
    note,
    forgot,
    item,
  },
});

export default store;

import { route } from "quasar/wrappers";
import authGaurd from "../helpers/authGaurd";
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/HomePage.vue") }],
    meta: {
      title: "Home",
      auth: true,
      breadcrumbs: {
        links: [],
        params: [],
        paramNameGetter: [],
      },
    },
    beforeEnter: authGaurd,
  },
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
    meta: {
      title: "Login",
      auth: false,
      breadcrumbs: {
        links: [],
        params: [],
        paramNameGetter: [],
      },
    },
    name: "Login",
    beforeEnter: authGaurd,
  },
  {
    path: "/register",
    component: () => import("pages/RegisterPage.vue"),
    meta: {
      title: "register",
      auth: false,
      breadcrumbs: {
        links: [],
        params: [],
        paramNameGetter: [],
      },
    },
    name: "register",
  },
  {
    path: "/courses",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/CoursesPage.vue") }],
    meta: {
      title: "courses",
      auth: true,
      breadcrumbs: {
        links: ["courses"],
        params: [],
        paramNameGetter: [],
      },
    },
    name: "Courses",
    beforeEnter: authGaurd,
  },
  {
    path: "/courses/:catId",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Courses/index.vue") },
    ],
    meta: {
      title: "courses",
      auth: true,
      breadcrumbs: {
        links: ["courses", "paramId"],
        params: ["catId"],
        paramNameGetter: [],
      },
    },
    name: "Courses Cat",
    beforeEnter: authGaurd,
  },
  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ProfilePage.vue") }],
    meta: {
      title: "Profile",
      auth: true,
      breadcrumbs: {
        links: ["profile"],
        params: [],
        paramNameGetter: [],
      },
    },
    name: "profile",
    beforeEnter: authGaurd,
  },
  {
    path: "/course",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Course/Index.vue") }],
    meta: {
      title: "Course",
      auth: true,
      breadcrumbs: {
        links: ["course", "paramId"],
        params: ["cId"],
        paramNameGetter: [
          { getter: "course/getCourseById", nameAttr: "cName" },
        ],
      },
    },
    name: "CourseSub",
    beforeEnter: authGaurd,
  },
  {
    path: "/course/:cId",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Course/Course.vue") },
    ],
    meta: {
      title: "Course",
      auth: true,
      breadcrumbs: {
        links: ["course", "paramId"],
        params: ["cId"],
        paramNameGetter: [
          { getter: "course/getCourseById", nameAttr: "cName" },
        ],
      },
    },
    name: "Course",
    beforeEnter: authGaurd,
  },
  {
    path: "/course/:cId/syllabus",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Course/Syllabus.vue") },
    ],
    meta: {
      title: "Course Syllabus",
      auth: true,
      breadcrumbs: {
        links: ["course", "paramId", "syllabus"],
        params: ["cId"],
        paramNameGetter: [
          { getter: "course/getCourseById", nameAttr: "cName" },
        ],
      },
    },
    name: "courseSyllabus",
    beforeEnter: authGaurd,
  },
  // ENROLL
  {
    path: "/course/:cId/enroll",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Course/Enroll.vue") },
    ],
    meta: {
      title: "Enroll",
      auth: true,
      breadcrumbs: {
        links: ["course", "paramId", "enroll"],
        params: ["cId"],
        paramNameGetter: [
          { getter: "course/getCourseById", nameAttr: "cName" },
        ],
      },
    },
    name: "enroll",
    beforeEnter: authGaurd,
  },
  {
    path: "/course/:cId/finish",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Course/Finish.vue") },
    ],
    meta: {
      title: "Finish",
      auth: true,
      breadcrumbs: {
        links: ["course", "paramId", "finish"],
        params: ["cId"],
        paramNameGetter: [
          { getter: "course/getCourseById", nameAttr: "cName" },
        ],
      },
    },
    name: "finish",
    beforeEnter: authGaurd,
  },
  {
    path: "/course/:cId/modules",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Course/Modules/index.vue") },
    ],
    meta: {
      title: "Modules",
      auth: true,
      breadcrumbs: {
        links: ["course", "paramId", "modules"],
        params: ["cId"],
        paramNameGetter: [
          { getter: "course/getCourseById", nameAttr: "cName" },
        ],
      },
    },
    name: "Modules",
    beforeEnter: authGaurd,
  },
  {
    path: "/course/:cId/modules/:mId",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Course/Modules/Module.vue") },
    ],
    meta: {
      title: "Module",
      auth: true,
      breadcrumbs: {
        links: ["course", "paramId", "modules", "paramId"],
        params: ["cId", "mId"],
        paramNameGetter: [
          { getter: "course/getCourseById", nameAttr: "cName" },
          { getter: "course/getModuleById", nameAttr: "mName" },
        ],
      },
    },
    name: "Module",
    beforeEnter: authGaurd,
  },
  {
    path: "/course/:cId/modules/:mId/lessons",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Course/Modules/Lessons/Index.vue"),
      },
    ],
    meta: {
      title: "Lessons",
      auth: true,
      breadcrumbs: {
        links: ["course", "paramId", "modules", "paramId", "lessons"],
        params: ["cId", "mId"],
        paramNameGetter: [
          { getter: "course/getCourseById", nameAttr: "cName" },
          { getter: "course/getModuleById", nameAttr: "mName" },
        ],
      },
    },
    name: "Lessons",
    beforeEnter: authGaurd,
  },
  {
    path: "/course/:cId/modules/:mId/lessons/:lId",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Course/Modules/Lessons/Lesson.vue"),
      },
    ],
    meta: {
      title: "Lesson",
      auth: true,
      breadcrumbs: {
        links: [
          "course",
          "paramId",
          "modules",
          "paramId",
          "lessons",
          "paramId",
        ],
        params: ["cId", "mId", "lId"],
        paramNameGetter: [
          { getter: "course/getCourseById", nameAttr: "cName" },
          { getter: "course/getModuleById", nameAttr: "mName" },
          { getter: "course/getLessonsById", nameAttr: "lName" },
        ],
      },
    },
    name: "Lesson",
    beforeEnter: authGaurd,
  },
  {
    path: "/course/:cId/modules/:mId/lessons/:lId/exam/:exId",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Course/Modules/Lessons/Exam/Index.vue"),
      },
    ],
    meta: {
      title: "Exam",
      auth: true,
      breadcrumbs: {
        links: ["course", "paramId", "modules", "paramId", "lessons"],
        params: ["cId", "mId"],
        paramNameGetter: [
          { getter: "course/getCourseById", nameAttr: "cName" },
          { getter: "course/getModuleById", nameAttr: "mName" },
        ],
      },
    },
    name: "Exam",
    beforeEnter: authGaurd,
  },

  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ProfilePage.vue") }],
    meta: {
      title: "Profile",
      auth: true,
      breadcrumbs: {
        links: ["profile"],
        params: [],
        paramNameGetter: [],
      },
    },
    name: "Profile",
    beforeEnter: authGaurd,
  },
  {
    path: "/reset",
    component: () => import("pages/forgotPassword/index.vue"),
    meta: {
      title: "rest",
      auth: true,
      breadcrumbs: {
        links: ["reset"],
        params: [],
        paramNameGetter: [],
      },
    },
    name: "reset",
  },
  {
    path: "/reset/:resetLink",
    component: () => import("pages/forgotPassword/passwordReset.vue"),
    meta: {
      title: "resetPage",
      auth: true,
      breadcrumbs: {
        links: ["resetPage"],
        params: [],
        paramNameGetter: [],
      },
    },
    name: "resetPage",
  },
  {
    path: "/support",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/SupportPage.vue") }],
    meta: {
      title: "Support",
      auth: true,
      breadcrumbs: {
        links: ["support"],
        params: [],
        paramNameGetter: [],
      },
    },
    name: "Support",
    beforeEnter: authGaurd,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:path(.*)",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  // {
  //   path: "/:catchAll(.*)*",
  //   component: () => import("pages/ErrorNotFound.vue"),
  // },
];

export default routes;

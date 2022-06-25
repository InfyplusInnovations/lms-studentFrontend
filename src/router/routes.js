import { route } from "quasar/wrappers";
import authGaurd from "../helpers/authGaurd";
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Home.vue") }],
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
    component: () => import("pages/Login.vue"),
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
    component: () => import("pages/Register.vue"),
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
    path: "/course",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Course/Index.vue") }],
    meta: {
      title: "Course",
      auth: true,
      breadcrumbs: {
        links: ["course"],
        params: [],
        paramNameGetter: [],
      },
    },
    name: "Courses",
    beforeEnter: authGaurd,
  },
  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Profile.vue") }],
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
    children: [{ path: "", component: () => import("pages/Home.vue") }],
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
    path: "/support",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Support.vue") }],
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

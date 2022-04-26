import authGaurd from "../helpers/authGaurd";
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Home.vue") }],
    meta: { title: "Home", auth: true },
    beforeEnter: authGaurd,
  },
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
    meta: { title: "Login", auth: false },
    name: "Login",
    beforeEnter: authGaurd,
  },

  {
    path: "/course",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Home.vue") }],
    meta: { title: "Home", auth: true },
    name: "Home",
    beforeEnter: authGaurd,
  },
  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Home.vue") }],
    meta: { title: "Home", auth: true },
    name: "Home",
    beforeEnter: authGaurd,
  },
  {
    path: "/support",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Home.vue") }],
    meta: { title: "Home", auth: true },
    name: "Home",
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

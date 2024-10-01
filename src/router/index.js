import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () =>
      import("@/views/HomePage.vue"),
  },
  {
    path: "/logIn",
    name: "LogIn",
    component: () => import("@/views/LogIn.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

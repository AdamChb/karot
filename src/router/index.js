// ------------------------------
//  Karot_2.0 - index.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains all the router paths
// ------------------------------

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/createMeals",
    name: "CreateMeals",
    component: () => import("@/views/CreateMeals.vue"),
  },
  {
    path: "/logIn",
    name: "LogIn",
    component: () => import("@/views/LogIn.vue"),
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/myAccount",
    name: "MyAccount",
    component: () => import("@/views/MyAccount.vue"),
  },
  {
    path: "/recipes",
    name: "RecipesPage",
    component: () => import("@/views/RecipesPage.vue"),
  },
  {
    path: "/recipe",
    name: "RecipePage",
    component: () => import("@/views/RecipePage.vue"),
  },
  {
    path: "/mymeals",
    name: "MyMeals",
    component: () => import("@/views/MyMeals.vue"),
  },
  {
    path: "/addRecipe",
    name: "AddRecipe",
    component: () => import("@/views/AddRecipe.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

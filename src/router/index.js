import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SuccessView from "../views/SuccessView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/registration-confirmed",
      name: "success",
      component: SuccessView
    },
    { 
      path: "/login", 
      name: "login", 
      component: LoginView 
    },
  ],
});

export default router;

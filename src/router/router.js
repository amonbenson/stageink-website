import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes = [
  { name: "home", path: "/", component: HomeView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

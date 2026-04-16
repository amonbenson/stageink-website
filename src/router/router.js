import ComeFromAwayView from "@/views/cfa/Index.vue";
import HomeView from "@/views/home/Index.vue";

export const routes = [
  { name: "home", path: "/", alias: "/index.html", component: HomeView },
  { name: "cfa", path: "/cfa", component: ComeFromAwayView },
];

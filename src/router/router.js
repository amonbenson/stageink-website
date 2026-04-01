import ComeFromAwayView from "@/views/ComeFromAwayView.vue";
import HomeView from "@/views/HomeView.vue";

export const routes = [
  { name: "home", path: "/", component: HomeView },
  { name: "cfa", path: "/cfa", component: ComeFromAwayView },
];

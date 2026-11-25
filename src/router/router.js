import NextShowView from "@/views/abh/Index.vue";
import ComeFromAwayView from "@/views/cfa/Index.vue";
import HomeView from "@/views/home/Index.vue";

// Note: trailing slashes are required (!) here for correct relative path resolution in the generated static site
export const routes = [
  { name: "home", path: "/", alias: "/index.html", component: HomeView },
  { name: "cfa", path: "/cfa/", component: ComeFromAwayView },
  { name: "abh", path: "/abh/", component: NextShowView },
];

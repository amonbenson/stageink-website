import ComeFromAwayView from "@/views/cfa/Index.vue";
import HomeView from "@/views/home/Index.vue";
import HomeView2 from "@/views/home2/Index.vue";

// Note: trailing slashes are required (!) here for correct relative path resolution in the generated static site
export const routes = [
  { name: "home", path: "/", alias: "/index.html", component: HomeView },
  { name: "home2", path: "/preview/", component: HomeView2 },
  { name: "cfa", path: "/cfa/", component: ComeFromAwayView },
];

import "./main.css";
import "virtual:auto-icons";

import { ViteSSG } from "vite-ssg";

import App from "./App.vue";
import LqipImage from "./components/LqipImage.vue";
import { routes } from "./router/router";

export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, ({ app }) => {
  app.component("LqipImage", LqipImage);
});

import "./style.css";

import { ViteSSG } from "vite-ssg";

import App from "./App.vue";
import { routes } from "./router/router";

export const createApp = ViteSSG(App, { routes });

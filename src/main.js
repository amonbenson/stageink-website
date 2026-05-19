import "./main.css";
import "virtual:auto-icons";

import { ViteSSG } from "vite-ssg";

import App from "./App.vue";
import BackgroundSection from "./components/BackgroundSection.vue";
import FlatCard from "./components/FlatCard.vue";
import LqipImage from "./components/LqipImage.vue";
import RoundButton from "./components/RoundButton.vue";
import SectionContainer from "./components/SectionContainer.vue";
import { routes } from "./router/router";

export const createApp = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, ({ app }) => {
  app.component("BackgroundSection", BackgroundSection);
  app.component("LqipImage", LqipImage);
  app.component("FlatCard", FlatCard);
  app.component("RoundButton", RoundButton);
  app.component("SectionContainer", SectionContainer);
});

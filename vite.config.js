import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import svgLoader from "vite-svg-loader";

import autoIconBundlePlugin from "./plugins/autoIconBundle.js";
import imageBundlePlugin from "./plugins/imageBundle.js";

export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [
    vue(),
    tailwindcss(),
    imageBundlePlugin(),
    imagetools(),
    autoIconBundlePlugin(),
    svgLoader(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

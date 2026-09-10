<script setup>
import { RouterView } from "vue-router";

import Haftungsausschluss from "@/content/Haftungsausschluss.vue";
</script>

<template>
  <BackdropMedia
    class="pointer-events-none fixed inset-0 -z-10 print:hidden"
  />

  <RouterView />

  <footer class="isolate bg-black">
    <Haftungsausschluss />
  </footer>
</template>

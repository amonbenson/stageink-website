<script setup>
import { RouterView } from "vue-router";

import Haftungsausschluss from "@/content/Haftungsausschluss.vue";
</script>

<template>
  <RouterView />

  <footer class="isolate bg-black">
    <Haftungsausschluss />
  </footer>
</template>

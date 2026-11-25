<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import SiteLogo from "@/components/SiteLogo.vue";
import { fetchNextShow } from "@/utils/nextShow";

// Placeholder until the production gets its own page: forwards to the ticket
// shop. The redirect runs in the browser so it always uses the current
// next-show.json, even when the HTML of this page is cached; if that file
// cannot be loaded, it goes home.
const router = useRouter();

onMounted(async () => {
  try {
    window.location.replace((await fetchNextShow()).ticketUrl);
  } catch {
    router.replace("/");
  }
});
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
    <SiteLogo />
    <p>Weiterleitung zum Ticketshop …</p>
  </main>
</template>

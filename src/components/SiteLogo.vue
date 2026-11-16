<script setup>
import StageInkLogo from "@/assets/stageInkLogo.svg?component";

defineProps({
  large: Boolean,
});
</script>

<template>
  <RouterLink
    to="/"
    aria-label="Stageink – zur Startseite"
  >
    <StageInkLogo
      aria-hidden="true"
      :class="large ? 'w-64 lg:w-96' : 'w-64'"
    />
  </RouterLink>
</template>

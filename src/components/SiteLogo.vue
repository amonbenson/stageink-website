<script setup>
import StageInkLogo from "@/assets/stageInkLogo.svg?component";

defineProps({
  large: Boolean,
});
</script>

<template>
  <RouterLink to="/">
    <StageInkLogo :class="large ? 'w-64 lg:w-96' : 'w-64'" />
  </RouterLink>
</template>

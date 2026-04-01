<script setup>
defineProps({
  large: Boolean,
});
</script>

<template>
  <RouterLink to="/">
    <img
      :class="large ? 'w-64 lg:w-96' : 'w-64'"
      src="/images/logo.svg"
      alt="StageInk Logo"
    >
  </RouterLink>
</template>

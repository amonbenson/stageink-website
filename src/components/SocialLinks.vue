<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  links: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <nav
    aria-label="Social Media"
    class="flex flex-row items-center justify-center gap-6 lg:flex-col"
  >
    <a
      v-for="link in links"
      :key="link.label"
      :href="link.url"
      :aria-label="link.label"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon
        :icon="link.icon"
        class="size-8"
      />
    </a>
  </nav>
</template>

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
  <div class="flex flex-row items-center justify-center gap-6 lg:flex-col lg:justify-start">
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
  </div>
</template>

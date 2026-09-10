<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  links: {
    type: Array,
    required: true,
  },
  hoverEffect: {
    type: String,
    default: "aura",
  },
});
</script>

<template>
  <nav
    aria-label="Social Media"
    class="flex flex-col items-center justify-center gap-6"
  >
    <a
      v-for="link in links"
      :key="link.label"
      :href="link.url"
      :aria-label="link.label"
      target="_blank"
      rel="noopener noreferrer"
      :class="{
        'aura-hover aura-spread-5 aura-white': hoverEffect === 'aura',
        'hover-scale': hoverEffect === 'scale',
      }"
    >
      <Icon
        :icon="link.icon"
        class="size-8"
      />
    </a>
  </nav>
</template>

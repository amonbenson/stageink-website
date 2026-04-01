<script setup>
import { RouterLink } from "vue-router";

defineProps({
  to: { type: String, default: null },
  href: { type: String, default: null },
});
</script>

<template>
  <component
    :is="to ? RouterLink : 'a'"
    v-bind="to
      ? { to }
      : { href, target: '_blank', rel: 'noopener noreferrer' }"
    class="block rounded-full px-6 py-2 text-center shadow-lg transition-opacity hover:opacity-75"
    :style="{
      backgroundColor: 'var(--btn-color, rgb(255 255 255 / 0.5))',
      color: 'var(--btn-text, black)',
    }"
  >
    <slot />
  </component>
</template>

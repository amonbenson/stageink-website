<script setup>
defineProps({
  title: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div
    class="flex flex-col items-stretch justify-stretch gap-4 bg-gray-950"
    :class="title || $slots.default ? 'p-4' : ''"
  >
    <h2 v-if="title">
      {{ title }}
    </h2>
    <slot
      v-if="$slots.image"
      name="image"
    />
    <slot v-if="$slots.default" />
  </div>
</template>

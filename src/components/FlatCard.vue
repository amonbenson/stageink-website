<script setup>
defineProps({
  title: {
    type: String,
    default: null,
  },
  transparent: Boolean,
  shadow: Boolean,
});
</script>

<template>
  <div
    class="flex flex-col items-stretch justify-between gap-4"
    :class="[
      title || $slots.default ? 'p-4' : '',
      transparent ? '' : 'bg-black/35 backdrop-blur-lg',
      shadow ? (transparent ? 'aura aura-black/25' : 'shadow-2xl shadow-black/25') : '',
    ]"
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

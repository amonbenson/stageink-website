<script setup>
defineOptions({ inheritAttrs: false });

defineProps({
  title: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div
    class="w-full max-w-4xl space-y-4 p-4 text-justify md:px-8 lg:px-16"
    v-bind="$attrs"
  >
    <h2 v-if="title">
      {{ title }}
    </h2>
    <slot />
  </div>
</template>

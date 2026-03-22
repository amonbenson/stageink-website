<script setup>
defineOptions({ inheritAttrs: false });

defineProps({
  title: {
    type: String,
    default: null,
  },
  collapsible: Boolean,
});
</script>

<template>
  <section
    class="mx-auto w-full max-w-4xl px-4 py-4 text-justify md:px-8 lg:px-16"
    v-bind="$attrs"
  >
    <details v-if="collapsible">
      <summary>
        <h2 v-if="title">
          {{ title }}
        </h2>
      </summary>
      <div class="mt-4 space-y-4">
        <slot />
      </div>
    </details>
    <template v-else>
      <h2 v-if="title">
        {{ title }}
      </h2>
      <div class="space-y-4">
        <slot />
      </div>
    </template>
  </section>
</template>

<style scoped>
summary {
  @apply relative cursor-pointer list-none;
}

summary::-webkit-details-marker {
  @apply hidden;
}

summary::before {
  content: '▶';
  @apply absolute left-[-1.2em] top-1/2 -translate-y-1/2 text-[0.7em] transition-transform duration-200;
}

details[open] > summary::before {
  @apply -translate-y-1/2 rotate-90;
}

@media (prefers-reduced-motion: reduce) {
  summary::before {
    @apply transition-none;
  }
}
</style>

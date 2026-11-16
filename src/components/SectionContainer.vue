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
    class="mx-auto w-full max-w-6xl px-4 py-6 sm:text-justify md:px-8 lg:px-16"
    v-bind="$attrs"
  >
    <details v-if="collapsible">
      <summary>
        <!-- min-w-0 lets long titles wrap inside the flex summary on phones -->
        <h2
          v-if="title"
          class="min-w-0"
        >
          {{ title }}
        </h2>
      </summary>
      <div class="mt-4 space-y-4">
        <slot />
      </div>
    </details>
    <template v-else>
      <h2
        v-if="title"
        class="mb-4"
      >
        {{ title }}
      </h2>
      <div class="space-y-4">
        <slot />
      </div>
    </template>
  </section>
</template>

<style scoped>
/* Makes the theme (breakpoints, colors) available to @apply in this block */
@reference "../main.css";

summary {
  @apply relative flex cursor-pointer list-none items-center gap-2 md:block;
}

summary::-webkit-details-marker {
  @apply hidden;
}

/* The ▶ marker sits inline on phones; from md the gutter is wide enough to hang it in the margin */
summary::before {
  content: '▶';
  @apply shrink-0 text-[0.7em] transition-transform duration-200 md:absolute md:top-1/2 md:left-[-1.2em] md:-translate-y-1/2;
}

details[open] > summary::before {
  @apply rotate-90 md:-translate-y-1/2;
}

@media (prefers-reduced-motion: reduce) {
  summary::before {
    @apply transition-none;
  }
}
</style>

<script setup>
import { ref } from "vue";

defineProps({
  src: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "Ich bin damit einverstanden, dass mir Inhalte von Google Maps angezeigt werden.",
  },
});

const consented = ref(false);
</script>

<template>
  <div class="relative w-full overflow-hidden bg-black/50">
    <iframe
      v-if="consented"
      :src="src"
      class="h-full w-full border-0"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />

    <div
      v-else
      class="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center"
    >
      <label class="flex cursor-pointer items-start gap-3 text-sm md:text-base">
        <input
          v-model="consented"
          type="checkbox"
          class="mt-1 size-4 shrink-0 cursor-pointer accent-current"
        >
        <span>{{ label }}</span>
      </label>
    </div>
  </div>
</template>

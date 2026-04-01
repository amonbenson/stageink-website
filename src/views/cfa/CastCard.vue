<script setup>
import FlatCard from "@/components/FlatCard.vue";

defineProps({
  image: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
});
</script>

<template>
  <FlatCard shadow>
    <template #image>
      <img
        :src="image"
        :alt="name"
        class="aspect-3/4 w-full object-cover"
      >
    </template>

    <div class="flex flex-col items-center justify-center gap-2 text-center">
      <div class="text-2xl uppercase">
        {{ name }}
      </div>
      <div class="text-sm">
        ist
      </div>
      <div class="text-2xl uppercase">
        {{ role }}
      </div>
    </div>
  </FlatCard>
</template>

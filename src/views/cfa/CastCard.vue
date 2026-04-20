<script setup>
import FlatCard from "@/components/FlatCard.vue";

defineProps({
  image: { type: String, required: true },
  name: { type: String, required: true },
  roles: { type: Array, required: true },
});
</script>

<template>
  <FlatCard shadow>
    <template #image>
      <img
        :src="image"
        :alt="name"
        class="aspect-4/5 w-full object-cover"
      >
    </template>

    <div class="flex h-full flex-col items-center justify-center gap-2 text-center">
      <div class="text-2xl uppercase">
        {{ name }}
      </div>
      <div class="text-sm">
        ist
      </div>
      <!-- <div class="flex flex-col items-center justify-center text-2xl uppercase">
        <div
          v-for="role in roles"
          :key="role"
        >
          {{ role }}
        </div>
      </div> -->
      <div class="text-2xl uppercase">
        {{ roles.map(r => r.replace(' ', '&nbsp;')).join(' & ') }}
      </div>
    </div>
  </FlatCard>
</template>

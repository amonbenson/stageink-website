<script setup>
import { computed } from "vue";

import FlatCard from "@/components/FlatCard.vue";

const props = defineProps({
  image: { type: String, required: true },
  name: { type: String, required: true },
  roles: { type: Array, required: true },
  infix: { type: String, default: "" },
  order: { type: String, default: "name-roles" },
  rolesRenderer: { type: Function, default: roles => roles.join(" & ") },
});

const rolesString = computed(() => props.rolesRenderer(props.roles.map(r => r.replace(" ", "\u00A0"))));
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
      <div class="text-2xl font-bold uppercase">
        {{ order === 'name-roles' ? name : rolesString }}
      </div>
      <div class="text-sm">
        {{ infix }}
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
        {{ order === 'name-roles' ? rolesString : name }}
      </div>
    </div>
  </FlatCard>
</template>

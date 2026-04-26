<script setup>
import { computed } from "vue";

import FlatCard from "@/components/FlatCard.vue";

const props = defineProps({
  image: { type: String, required: true },
  name: { type: String, required: true },
  roles: { type: Array, required: true },
  infix: { type: String, default: "" },
  separator: { type: String, default: ", " },
  breakRoles: { type: Boolean, default: false },
});

const rolesString = computed(() => {
  // Trim roles and optionally replace spaces with non-breaking spaces
  const roles = props.roles.map(role => props.breakRoles ? role.trim().replace(" ", "\u00A0") : role.trim());

  // Join roles with the specified separator
  return roles.join(props.separator);
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
      <div class="text-2xl font-bold uppercase">
        {{ name }}
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
        {{ rolesString }}
      </div>
    </div>
  </FlatCard>
</template>

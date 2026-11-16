<script setup>
import { computed } from "vue";

const props = defineProps({
  image: { type: String, required: true },
  name: { type: String, required: true },
  roles: { type: Array, required: true },
  separator: { type: String, default: ", " },
  breakRoles: { type: Boolean, default: false },
});

const rolesString = computed(() => {
  const roles = props.roles.map(role => props.breakRoles ? role.trim().replace(" ", "\u00A0") : role.trim());

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
      <div class="text-2xl uppercase">
        {{ rolesString }}
      </div>
    </div>
  </FlatCard>
</template>

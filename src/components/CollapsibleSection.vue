<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <details>
    <summary>
      <h2>{{ title }}</h2>
    </summary>
    <slot />
  </details>
</template>

<style scoped>
summary {
  display: flex;
  align-items: center;
  cursor: pointer;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

summary::before {
  content: '▶';
  flex-shrink: 0;
  margin-right: 0.4em;
  font-size: 0.7em;
  transition: transform 0.2s;
}

details[open] > summary::before {
  transform: rotate(90deg);
}
</style>

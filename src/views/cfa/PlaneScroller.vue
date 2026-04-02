<script setup>
import plane from "./assets/plane.png?lqip";
</script>

<template>
  <LqipImage
    :src="plane"
    background
    class="plane-scroller my-32 h-(--animate-scroll-x-amount) w-full bg-size-[auto_100%] bg-repeat-x [--animate-scroll-x-amount:2rem]"
  />
</template>

<style>
.plane-scroller {
  animation: scroll-x 0.5s linear infinite;
}

@keyframes scroll-x {
  from { background-position: 0 0; }
  to { background-position: var(--animate-scroll-x-amount) 0; }
}
</style>

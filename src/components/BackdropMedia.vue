<script setup>
import { computed } from "vue";

import { useBackdrop } from "@/composables/useBackdrop";

// Renders the backdrop selected via the `v-backdrop` directive (see
// composables/useBackdrop.js). Place it in a full-screen, non-interactive
// container, e.g. class="pointer-events-none fixed inset-0 -z-10".
const backdrop = useBackdrop();

// The backdrop is dimmed by fading a colored overlay in front of it.
const overlayOpacity = computed(() => 1 - (backdrop.value.src ? backdrop.value.opacity : 0));
</script>

<template>
  <div class="bg-black">
    <!--
      Keyed by image url so a source change cross-fades the old and the new
      layer. Video backdrops would be added as an additional layer here.
    -->
    <Transition
      enter-active-class="transition-opacity duration-500 motion-reduce:transition-none"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-500 motion-reduce:transition-none"
      leave-to-class="opacity-0"
    >
      <LqipImage
        v-if="backdrop.src"
        :key="backdrop.src.url"
        :src="backdrop.src"
        background
        aspect-ratio="auto"
        class="absolute inset-0 bg-cover"
        :class="{
          'bg-center': backdrop.origin === 'center',
          'bg-[25%_center]': backdrop.origin === 'left',
          'bg-[75%_center]': backdrop.origin === 'right',
        }"
      />
    </Transition>

    <!-- Dimming overlay, keeps the foreground content readable -->
    <div
      class="absolute inset-0 transition-[opacity,background-color] duration-500 motion-reduce:transition-none"
      :style="{ opacity: overlayOpacity, backgroundColor: backdrop.color }"
    />
  </div>
</template>

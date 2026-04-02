<script setup>
defineProps({
  src: {
    type: Object,
    required: true,
  },
  // e.g. "3840/4799" — passed as CSS aspect-ratio value
  aspect: {
    type: String,
    default: null,
  },
  // true = bg-cover (crop to fill), false = bg-[length:100%_auto] (scale to width)
  cover: {
    type: Boolean,
    default: false,
  },
  // push slot content to the bottom of the section
  alignEnd: {
    type: Boolean,
    default: false,
  },
  // pass through to LqipImage — set true if the image has transparency so the
  // LQIP is removed once the real image has loaded
  transparent: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <LqipImage
    :src="src"
    background
    :transparent="transparent"
    class="isolate flex w-full flex-col items-center"
    :class="[
      cover ? 'bg-cover bg-center' : 'bg-size-[100%_auto]',
      alignEnd ? 'justify-end' : '',
    ]"
    :style="{ aspectRatio: aspect ?? undefined }"
  >
    <slot />
  </LqipImage>
</template>

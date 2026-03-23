<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: null,
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
});
</script>

<template>
  <div
    class="isolate flex w-full flex-col items-center"
    :class="[
      cover ? 'bg-cover bg-center' : 'bg-size-[100%_auto]',
      alignEnd ? 'justify-end' : '',
    ]"
    :style="{
      backgroundImage: placeholder ? `url(${image}), url(${placeholder})` : `url(${image})`,
      aspectRatio: aspect ?? undefined,
    }"
  >
    <slot />
  </div>
</template>

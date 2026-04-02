<script setup>
import { onMounted, ref } from "vue";

// Accepts a bundle object produced by a `?lqip` import:
// { url: String, lqip: String, width: Number, height: Number }
const props = defineProps({
  src: {
    type: Object,
    required: true,
  },
  // Render as a <div> with a CSS background-image instead of an <img>.
  // Use for decorative/layout backgrounds. Exposes a default slot for content.
  background: {
    type: Boolean,
    default: false,
  },
  // Set to true for images with transparency. Clears the LQIP background once
  // the real image has loaded so it doesn't bleed through transparent areas.
  // Only applies in img mode.
  transparent: {
    type: Boolean,
    default: false,
  },
});

defineOptions({ inheritAttrs: false });

const imgRef = ref(null);

function clearLqip() {
  if (!imgRef.value) {
    return;
  }

  // Always restore the text color — hides the alt text during LQIP display.
  imgRef.value.style.color = "";

  if (props.transparent) {
    imgRef.value.style.backgroundImage = "none";
  }
}

// Handle the case where the image is already in the browser cache and `load`
// fires before Vue has a chance to attach the @load listener.
onMounted(() => {
  if (imgRef.value?.complete) {
    clearLqip();
  }
});
</script>

<template>
  <div
    v-if="background"
    v-bind="$attrs"
    :style="{ backgroundImage: `url(${src.url}), url(${src.lqip})` }"
  >
    <slot />
  </div>

  <img
    v-else
    ref="imgRef"
    v-bind="$attrs"
    :src="src.url"
    :width="src.width"
    :height="src.height"
    :style="{ backgroundImage: `url(${src.lqip})`, backgroundSize: 'cover', color: 'transparent' }"
    @load="clearLqip()"
  >
</template>

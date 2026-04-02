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
  // Works in both img and background div mode.
  transparent: {
    type: Boolean,
    default: false,
  },
});

defineOptions({ inheritAttrs: false });

const imgRef = ref(null);
const containerRef = ref(null);

// img mode: restore text color (hides alt text during placeholder display) and
// optionally clear the background LQIP for transparent images.
function clearImgLqip() {
  if (!imgRef.value) {
    return;
  }

  imgRef.value.style.color = "";

  if (props.transparent) {
    imgRef.value.style.backgroundImage = "none";
  }
}

// Background div mode: remove the LQIP layer from the stacked background-image.
// CSS background-images have no load event, so we use a hidden Image object to
// detect when the real image is ready.
function watchBackgroundLoad() {
  if (!props.transparent) {
    return;
  }

  const img = new Image();
  img.onload = () => {
    if (containerRef.value) {
      containerRef.value.style.backgroundImage = `url(${props.src.url})`;
    }
  };

  img.src = props.src.url;

  // Already in cache — fire immediately.
  if (img.complete) {
    img.onload();
  }
}

onMounted(() => {
  if (props.background) {
    watchBackgroundLoad();
  } else if (imgRef.value?.complete) {
    clearImgLqip();
  }
});
</script>

<template>
  <div
    v-if="background"
    ref="containerRef"
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
    :style="{
      aspectRatio: `${src.width} / ${src.height}`,
      backgroundImage: `url(${src.lqip})`,
      backgroundSize: 'cover',
      color: 'transparent',
    }"
    @load="clearImgLqip()"
  >
</template>

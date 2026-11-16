<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

// Accepts a bundle object produced by a `?lqip` import:
// { url: String, lqip: String, width: Number, height: Number, srcset: Array|null }
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
  // Override the auto-computed aspect ratio (e.g. "1/1", "4/3", "16/9").
  // Defaults to the image's natural dimensions.
  aspectRatio: {
    type: String,
    default: null,
  },
  // img mode with a `widths` import: the rendered width (HTML `sizes`
  // attribute), e.g. "14rem". The browser then picks the matching version.
  sizes: {
    type: String,
    default: null,
  },
});

defineOptions({ inheritAttrs: false });

const imgRef = ref(null);
const containerRef = ref(null);

const ratio = computed(() => props.aspectRatio ?? `${props.src.width} / ${props.src.height}`);

const srcsetAttr = computed(() => props.src.srcset?.map(({ url, width }) => `${url} ${width}w`).join(", "));

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

// Background div mode. Without a srcset, the full image is part of the
// pre-rendered HTML. With one, only the LQIP is, and the smallest version that
// covers the element is chosen once its size is known (and upgraded if the
// element grows). CSS backgrounds have no load event, so a hidden Image object
// detects when a version is ready.
const backgroundUrl = ref(props.src.srcset ? null : props.src.url);
const backgroundLoaded = ref(false);
let loadingWidth = 0;
let resizeObserver = null;

const backgroundImage = computed(() => {
  const layers = [];

  if (backgroundUrl.value) {
    layers.push(`url(${backgroundUrl.value})`);
  }

  if (!(props.transparent && backgroundLoaded.value)) {
    layers.push(`url(${props.src.lqip})`);
  }

  return layers.join(", ");
});

function loadBackground(url, onLoad) {
  const img = new Image();
  img.onload = onLoad;
  img.src = url;

  // Already in cache – fire immediately.
  if (img.complete) {
    img.onload();
  }
}

// Pixels needed across the image's width: the element width, or more for
// bg-cover when the element is relatively taller than the image.
function requiredWidth(element) {
  const { width, height } = element.getBoundingClientRect();
  const isCover = getComputedStyle(element).backgroundSize.includes("cover");
  const coverWidth = isCover ? height * props.src.width / props.src.height : 0;
  return Math.max(width, coverWidth) * window.devicePixelRatio;
}

function pickBackgroundVersion() {
  const needed = requiredWidth(containerRef.value);
  const candidate = props.src.srcset.find(({ width }) => width >= needed) ?? props.src.srcset.at(-1);

  if (candidate.width <= loadingWidth) {
    return;
  }

  loadingWidth = candidate.width;
  loadBackground(candidate.url, () => {
    backgroundUrl.value = candidate.url;
    backgroundLoaded.value = true;
  });
}

onMounted(() => {
  if (!props.background) {
    if (imgRef.value?.complete) {
      clearImgLqip();
    }

    return;
  }

  if (props.src.srcset) {
    // Pick right away (observers don't fire in background tabs), then upgrade if
    // the element grows, e.g. once the surrounding layout has settled
    pickBackgroundVersion();
    resizeObserver = new ResizeObserver(pickBackgroundVersion);
    resizeObserver.observe(containerRef.value);
  } else {
    loadBackground(props.src.url, () => {
      backgroundLoaded.value = true;
    });
  }
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
});
</script>

<template>
  <div
    v-if="background"
    ref="containerRef"
    v-bind="$attrs"
    :style="{ backgroundImage, aspectRatio: ratio }"
  >
    <slot />
  </div>

  <img
    v-else
    ref="imgRef"
    v-bind="$attrs"
    :src="src.url"
    :srcset="srcsetAttr"
    :sizes="srcsetAttr ? sizes : undefined"
    :style="{
      aspectRatio: ratio,
      backgroundImage: `url(${src.lqip})`,
      backgroundSize: 'cover',
      color: 'transparent',
    }"
    @load="clearImgLqip()"
  >
</template>

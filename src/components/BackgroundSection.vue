<script setup>
const props = defineProps({
  src: {
    type: Object,
    required: true,
  },
  // e.g. "3840/4799" – passed as CSS aspect-ratio value
  aspect: {
    type: String,
    default: null,
  },
  // Caps the height given by the aspect ratio (any CSS length, e.g. "90rem").
  // Unlike a max-height on the section, this only limits the image-driven
  // height: content taller than the cap still grows the section downwards
  // instead of overflowing it.
  maxHeight: {
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
  // Fades the bottom edge of the image into the page background (black), for
  // sections that can grow taller than the image (only without cover). The
  // rest of the section below the image is filled black.
  fade: {
    type: Boolean,
    default: false,
  },
  // pass through to LqipImage – set true if the image has transparency so the
  // LQIP is removed once the real image has loaded
  transparent: {
    type: Boolean,
    default: false,
  },
});

const aspectRatio = props.aspect ?? `${props.src.width} / ${props.src.height}`;
</script>

<template>
  <!--
    Single-cell grid: the section is as tall as the larger of its content and
    its aspect ratio. Without a cap, the section itself carries the aspect ratio
    (including its padding); with a cap, a spacer in the same cell does.
    grid-cols-1 (minmax(0, 1fr)) keeps the spacer's ratio-derived min width
    from widening the section beyond its container.
  -->
  <LqipImage
    :src="src"
    background
    :transparent="transparent"
    :aspect-ratio="maxHeight ? 'auto' : aspectRatio"
    class="relative isolate grid w-full grid-cols-1"
    :class="cover ? 'bg-cover bg-center' : 'bg-size-[100%_auto]'"
  >
    <!--
      Overlay: a gradient with the image's natural ratio sits on the image's
      bottom edge, black fills the rest. The wrapper clips the gradient where
      the section is shorter than the image.
    -->
    <div
      v-if="fade"
      class="pointer-events-none absolute inset-0 -z-10 flex flex-col overflow-hidden"
    >
      <div
        class="w-full shrink-0 bg-linear-to-b from-transparent from-85% to-black"
        :style="{ aspectRatio: `${src.width} / ${src.height}` }"
      />
      <div class="w-full flex-1 bg-black" />
    </div>

    <div
      v-if="maxHeight"
      class="col-start-1 row-start-1"
      :style="{ aspectRatio, maxHeight }"
    />

    <div
      class="col-start-1 row-start-1 flex w-full flex-col items-center"
      :class="{ 'justify-end': alignEnd }"
    >
      <slot />
    </div>
  </LqipImage>
</template>

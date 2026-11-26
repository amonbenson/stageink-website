<script setup>
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from "vue";

import { fetchNextShow } from "@/utils/nextShow";

import RosePetalHole from "./RosePetalHole.vue";

// Name and ticket sale of the next production are announced at this moment.
// The values live only in next-show.json, never in the bundle.
const REVEAL_DATE = new Date("2026-11-27T18:00:00+01:00");

const CLOCK_CLASS = "text-6xl/tight sm:text-8xl/tight lg:text-9xl/tight";
// Larger digits on the same line height as CLOCK_CLASS, so the card keeps its
// height when the last minute starts. 11rem is off the type scale.
const FINAL_MINUTE_CLASS = "text-8xl/[4.6875rem] sm:text-9xl/30 lg:text-[11rem]/40";

// Allura draws its glyphs right of the center of their advance width, so the
// clock looks shifted right. Each character is moved back by this many em,
// measured as the offset of the ink center with canvas measureText().
const INK_OFFSET = { "0": 0.03, "1": 0.03, "2": 0.03, "3": 0.01, "4": 0.03, "5": 0.02, "6": 0.03, "7": 0.13, "8": 0.03, "9": 0.02, ":": 0.07, "–": 0.15 };

// next-show.json is fetched this long before the reveal, so the name appears
// the moment the countdown ends
const PREFETCH_MS = 5000;

// A failed fetch of next-show.json is retried this often
const FETCH_RETRY_MS = 5000;

const background = useTemplateRef("background");

// Null until mounted, so the pre-rendered HTML always shows the placeholder
// clock and never depends on the build time
const now = ref(null);
const show = ref(null);
let fetched = null;
let loading = false;
let lastFetchAttempt = -Infinity;
let timer = null;

// Rounded up, so the clock reaches 0 exactly at the reveal. Null until
// mounted, like now.
const remaining = computed(() => {
  if (now.value === null) {
    return null;
  }

  return Math.max(0, Math.ceil((REVEAL_DATE.getTime() - now.value) / 1000));
});

// The last minute counts down bare seconds in larger digits
const finalMinute = computed(() => remaining.value !== null && remaining.value < 60);

const clock = computed(() => {
  if (remaining.value === null) {
    return "–:––:––:––";
  }

  if (finalMinute.value) {
    return String(remaining.value);
  }

  const days = Math.floor(remaining.value / 86400);
  const seconds = remaining.value % 86400;
  const parts = [Math.floor(seconds / 3600), Math.floor(seconds % 3600 / 60), seconds % 60]
    .map(value => String(value).padStart(2, "0"));
  return [days, ...parts].join(":");
});

const untilReveal = () => REVEAL_DATE.getTime() - Date.now();

function reveal() {
  clearTimeout(timer);
  show.value = fetched;
  background.value?.explode();
}

// Fetched only shortly before the reveal, so a page opened before the reveal
// deploy still gets the real values. Held back until the countdown ends.
async function loadShow() {
  loading = true;
  lastFetchAttempt = Date.now();
  try {
    fetched = await fetchNextShow();
    if (untilReveal() <= 0) {
      reveal();
    }
  } catch {
    // Retried by tick()
  } finally {
    loading = false;
  }
}

function tick() {
  now.value = Date.now();
  if (fetched && untilReveal() <= 0) {
    reveal();
    return;
  }

  if (!fetched && untilReveal() <= PREFETCH_MS && !loading && now.value - lastFetchAttempt >= FETCH_RETRY_MS) {
    loadShow();
  }

  // Ticks on the full seconds before the reveal, so the clock steps in time
  // and the reveal is not up to a second late
  const delay = untilReveal() > 0 ? untilReveal() % 1000 || 1000 : 1000;
  timer = setTimeout(tick, delay);
}

onMounted(tick);

onUnmounted(() => clearTimeout(timer));
</script>

<template>
  <article
    class="relative isolate w-full overflow-hidden rounded-4xl bg-radial from-abh-hole from-10% to-abh-tunnel p-6 text-center text-white shadow-xl select-none text-shadow-lg lg:p-10"
    @pointermove="background?.paint($event)"
    @pointerdown="background?.paint($event)"
  >
    <RosePetalHole ref="background" />

    <div
      v-if="show"
      class="space-y-6"
    >
      <div>
        <p class="text-xl lg:text-2xl">
          Unsere nächste Hauptproduktion:
        </p>
        <!-- Styled on the span: the unlayered h2 defaults in main.css beat utilities on the h2 itself -->
        <h2>
          <span class="block py-2 font-script text-7xl/none text-primary normal-case lg:text-9xl/none">{{ show.name }}</span>
        </h2>
        <p class="text-xl lg:text-2xl">
          <b>18.–20.</b> und <b>25.–27. Juni 2027</b>
        </p>
      </div>

      <RoundButton
        :href="show.ticketUrl"
        class="mx-auto w-fit px-10 text-shadow-none"
        style="--btn-color: var(--color-primary); --btn-text: white;"
      >
        Tickets
      </RoundButton>
    </div>

    <div
      v-else
      class="space-y-2"
    >
      <p class="text-2xl lg:text-4xl">
        Nur noch
      </p>

      <!-- One fixed-width box per digit, so the script digits don't jitter while counting -->
      <p
        role="timer"
        class="font-script whitespace-nowrap text-primary"
        :class="finalMinute ? FINAL_MINUTE_CLASS : CLOCK_CLASS"
      >
        <span
          v-for="(char, i) in clock"
          :key="i"
          class="inline-block text-center"
          :class="char === ':' ? 'px-[0.08em]' : 'w-[0.5em]'"
          :style="{ translate: `-${INK_OFFSET[char] ?? 0}em` }"
        >{{ char }}</span>
      </p>

      <p class="text-xl lg:text-3xl">
        <template v-if="finalMinute">
          {{ remaining === 1 ? "Sekunde" : "Sekunden" }}
        </template>
        bis zur Verkündung unserer neuen Produktion!
      </p>
    </div>
  </article>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from "vue";

import { fetchNextShow } from "@/utils/nextShow";

import RosePetalHole from "./RosePetalHole.vue";

// Name and ticket sale of the next production are announced at this moment.
// The real values are deployed to next-show.json shortly before; until then it
// holds a joke for anyone setting their device clock forward.
const REVEAL_DATE = new Date("2026-11-27T00:00:00+01:00");

// A failed fetch of next-show.json is retried this often
const FETCH_RETRY_MS = 5000;

const background = useTemplateRef("background");

// Null until mounted, so the pre-rendered HTML always shows the placeholder
// clock and never depends on the build time
const now = ref(null);
const show = ref(null);
let loading = false;
let lastFetchAttempt = -Infinity;
let timer = null;

const clock = computed(() => {
  if (now.value === null) {
    return "–:––:––:––";
  }

  let remaining = Math.max(0, Math.floor((REVEAL_DATE.getTime() - now.value) / 1000));
  const days = Math.floor(remaining / 86400);
  remaining %= 86400;
  const parts = [Math.floor(remaining / 3600), Math.floor(remaining % 3600 / 60), remaining % 60]
    .map(value => String(value).padStart(2, "0"));
  return [days, ...parts].join(":");
});

// Fetched only once the countdown ends, so a page opened before the reveal
// deploy still gets the real values
async function loadShow() {
  loading = true;
  lastFetchAttempt = Date.now();
  try {
    show.value = await fetchNextShow();
    clearInterval(timer);
  } catch {
    // Retried by tick()
  } finally {
    loading = false;
  }
}

function tick() {
  now.value = Date.now();
  if (now.value < REVEAL_DATE.getTime() || loading || now.value - lastFetchAttempt < FETCH_RETRY_MS) {
    return;
  }

  loadShow();
}

onMounted(() => {
  tick();
  timer = setInterval(tick, 1000);
});

onUnmounted(() => clearInterval(timer));
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
        class="font-script text-6xl/tight whitespace-nowrap text-primary sm:text-8xl/tight lg:text-9xl/tight"
      >
        <span
          v-for="(char, i) in clock"
          :key="i"
          class="inline-block text-center"
          :class="char === ':' ? 'px-[0.08em]' : 'w-[0.5em]'"
        >{{ char }}</span>
      </p>

      <p class="text-xl lg:text-3xl">
        bis zur Verkündung unserer neuen Produktion!
      </p>
    </div>
  </article>
</template>

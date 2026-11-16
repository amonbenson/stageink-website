<script setup>
import { computed, onMounted, ref } from "vue";

import ShowDates from "@/components/ShowDates.vue";

import HeroCard from "./HeroCard.vue";

// One card per event. A single date renders as a one-time event (concert,
// gig, …), several dates as a production with a show schedule.
// See src/views/home/AGENTS.md › Events.
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  // Small line above the title, e.g. "Ausschnitte aus"
  kicker: {
    type: String,
    default: null,
  },
  // Start time of every show
  dates: {
    type: Array,
    required: true,
    validator: dates => dates.length > 0 && dates.every(date => date instanceof Date),
  },
  // End time of a one-time event, shown as a time range
  end: {
    type: Date,
    default: null,
  },
  // { name, address?, url? }
  venue: {
    type: Object,
    default: null,
  },
  // Bundle from a `?lqip` import
  poster: {
    type: Object,
    default: null,
  },
  posterAlt: {
    type: String,
    default: null,
  },
  // { url, label? } – the poster links here; with a label, a button is shown too
  link: {
    type: Object,
    default: null,
  },
  // Route of the production's own page, e.g. "/cfa/"
  projectPage: {
    type: String,
    default: null,
  },
});

const pad = number => String(number).padStart(2, "0");
const formatDate = date => `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
const formatTime = date => `${pad(date.getHours())}:${pad(date.getMinutes())}`;
const isoDateTime = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${formatTime(date)}`;

const isOneTime = computed(() => props.dates.length === 1);

const dateLabel = computed(() => {
  const [start] = props.dates;
  const time = props.end ? `${formatTime(start)} – ${formatTime(props.end)}` : formatTime(start);
  return `${formatDate(start)}, ${time} Uhr`;
});

// Hide the card once the last show's day is over. This runs in the browser
// only, so the pre-rendered HTML always matches the first client render; the
// next build removes the card from the HTML as well.
const isOver = ref(false);

onMounted(() => {
  const lastDay = new Date(Math.max(...props.dates, props.end ?? 0));
  lastDay.setHours(23, 59, 59, 999);
  isOver.value = Date.now() > lastDay.getTime();
});
</script>

<template>
  <HeroCard
    v-if="!isOver"
    class="flex flex-col gap-6 sm:flex-row sm:items-center lg:gap-8"
  >
    <div class="flex flex-1 flex-col gap-4">
      <header class="space-y-1">
        <p v-if="kicker">
          {{ kicker }}
        </p>

        <h2>{{ title }}</h2>

        <p
          v-if="isOneTime"
          class="font-bold"
        >
          <time :datetime="isoDateTime(dates[0])">{{ dateLabel }}</time>
        </p>

        <address
          v-if="venue"
          class="not-italic"
        >
          <component
            :is="venue.url ? 'a' : 'span'"
            v-bind="venue.url ? { href: venue.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
            :class="{ 'text-primary underline-offset-4 hover:underline': venue.url }"
          >
            <!-- Only break the line between the name and the address -->
            <span class="whitespace-nowrap">{{ venue.address ? `${venue.name},` : venue.name }}</span>{{ " " }}<span
              v-if="venue.address"
              class="whitespace-nowrap"
            >{{ venue.address }}</span>
          </component>
        </address>
      </header>

      <ShowDates
        v-if="!isOneTime"
        :shows="dates"
      />

      <div
        v-if="$slots.default"
        class="space-y-4"
      >
        <slot />
      </div>

      <RoundButton
        v-if="projectPage"
        :to="projectPage"
      >
        Zur Projektseite
      </RoundButton>

      <RoundButton
        v-if="link?.label"
        :href="link.url"
        style="--btn-color: var(--color-primary); --btn-text: white;"
      >
        {{ link.label }}
      </RoundButton>
    </div>

    <component
      :is="link ? 'a' : 'div'"
      v-if="poster"
      v-bind="link ? { href: link.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
      class="w-full max-w-56 shrink-0 self-center lg:w-56"
    >
      <LqipImage
        :src="poster"
        :alt="posterAlt"
        sizes="14rem"
        class="w-full shadow-xl"
      />
    </component>
  </HeroCard>
</template>

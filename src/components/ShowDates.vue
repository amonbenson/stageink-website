<script setup>
import { computed } from "vue";

const props = defineProps({
  shows: {
    type: Array,
    required: true,
    // Array of Date objects, each representing a single performance (time included)
  },
});

const formatWeekday = date => date.toLocaleDateString("de-DE", { weekday: "short" }).replace(".", "");
const formatDate = date => date.toLocaleDateString("de-DE", { day: "numeric", month: "numeric" });
const formatTime = date => date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

const weekends = computed(() => {
  const sorted = [...props.shows].sort((a, b) => a - b);

  // Split into clusters where a gap > 4 days starts a new weekend
  const clusters = [];
  let current = [];

  for (const show of sorted) {
    if (current.length > 0) {
      const dayGap = (show - current[current.length - 1]) / (1000 * 60 * 60 * 24);

      if (dayGap > 4) {
        clusters.push(current);
        current = [];
      }
    }

    current.push(show);
  }

  if (current.length > 0) {
    clusters.push(current);
  }

  // Within each cluster, group by calendar day; split matinee (<17:00) vs evening
  return clusters.map((cluster) => {
    const byDay = new Map();

    for (const show of cluster) {
      const key = show.toDateString();

      if (!byDay.has(key)) {
        byDay.set(key, { date: show, matinee: null, evening: null });
      }

      if (show.getHours() < 17) {
        byDay.get(key).matinee = show;
      } else {
        byDay.get(key).evening = show;
      }
    }

    return [...byDay.values()];
  });
});
</script>

<template>
  <div class="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1 tabular-nums">
    <template
      v-for="(weekend, wi) in weekends"
      :key="wi"
    >
      <div
        v-if="wi > 0"
        class="col-span-3 h-3"
      />
      <template
        v-for="day in weekend"
        :key="day.date.toDateString()"
      >
        <div class="text-start">
          {{ formatWeekday(day.date) }} {{ formatDate(day.date) }}
        </div>
        <div class="text-end">
          {{ day.matinee ? formatTime(day.matinee) : '' }}
        </div>
        <div class="text-end">
          {{ day.evening ? formatTime(day.evening) : '' }}
        </div>
      </template>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  shows: {
    type: Array,
    required: true,
  },
});

const formatWeekday = date => date.toLocaleDateString("de-DE", { weekday: "short" }).replace(".", "");
const formatDate = date => date.toLocaleDateString("de-DE", { day: "numeric", month: "numeric" });
const formatTime = date => date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

function isoWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

const weekKey = date => `${date.getFullYear()}-${isoWeek(date)}`;

const weeks = computed(() => {
  const sorted = [...props.shows].sort((a, b) => a - b);

  const result = [];
  let currentWeek = null;
  let currentDay = null;

  for (const show of sorted) {
    // Group by week
    const wk = weekKey(show);
    if (wk !== currentWeek) {
      result.push([]);
      currentWeek = wk;
      currentDay = null;
    }

    // Group by day
    const dayStr = show.toDateString();
    if (dayStr !== currentDay) {
      result[result.length - 1].push({ date: show, shows: [show] });
      currentDay = dayStr;
    } else {
      result[result.length - 1].at(-1).shows.push(show);
    }
  }

  return result.map(week =>
    week.map(day => ({
      date: day.date,
      matinee: day.shows.length > 1 ? day.shows[0] : null,
      evening: day.shows.at(-1),
    })),
  );
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="(week, wi) in weeks"
      :key="wi"
      class="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1 tabular-nums"
    >
      <template
        v-for="day in week"
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
    </div>
  </div>
</template>

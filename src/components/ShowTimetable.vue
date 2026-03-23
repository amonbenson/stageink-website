<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  ticketUrl: {
    type: String,
    required: true,
  },
  weekends: {
    type: Array,
    required: true,
    // [[{ date: Date, afternoon: string|null, evening: string }]]
  },
});

const formatWeekday = date => date.toLocaleDateString("de-DE", { weekday: "short" }).replace(".", "");
const formatDate = date => date.toLocaleDateString("de-DE", { day: "numeric", month: "numeric" });
</script>

<template>
  <a
    :href="ticketUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="block w-fit space-y-4 rounded-4xl bg-white/75 p-4 text-center text-black backdrop-blur-lg lg:p-8"
  >
    <h2>{{ title }}</h2>
    <p>Im <strong>{{ venue }}</strong></p>
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
          v-for="show in weekend"
          :key="show.date.getTime()"
        >
          <div class="text-start">
            {{ formatWeekday(show.date) }} {{ formatDate(show.date) }}
          </div>
          <div class="text-end">
            {{ show.afternoon ?? '' }}
          </div>
          <div class="text-end">
            {{ show.evening }}
          </div>
        </template>
      </template>
    </div>
    <div class="rounded-full bg-primary px-6 py-2 text-white shadow-xl">
      TICKETS jetzt <strong>HIER</strong> verfügbar!
    </div>
  </a>
</template>

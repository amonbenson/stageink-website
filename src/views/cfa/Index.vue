<script setup>
import BackgroundSection from "@/components/BackgroundSection.vue";
import FlatCard from "@/components/FlatCard.vue";
import SectionContainer from "@/components/SectionContainer.vue";
import ShowDates from "@/components/ShowDates.vue";
import SiteLogo from "@/components/SiteLogo.vue";
import { useScrollTimeline } from "@/composables/useScrollTimeline.js";

import backgroundMapUrl from "./assets/backgroundMap.png?format=webp&quality=100&imagetools";
import backgroundMapLqip from "./assets/backgroundMap.png?w=50&format=webp&inline";
import cfaLogoUrl from "./assets/cfaLogo.png?format=webp&imagetools";
import CastCard from "./CastCard.vue";
import PlaneScroller from "./PlaneScroller.vue";

useScrollTimeline((timeline) => {
  const backgroundMap = document.getElementById("cfa-background-map");
  timeline.fromTo(backgroundMap, {
    scale: 1.0,
    rotation: 0,
  }, {
    scale: 1.5,
    rotation: 5,
    ease: "power1.in",
  }, 0);
});

const cast = [
  { name: "Person X", role: "Rolle Y", image: "https://placehold.co/400x533" },
  { name: "Person X", role: "Rolle Y", image: "https://placehold.co/400x533" },
  { name: "Person X", role: "Rolle Y", image: "https://placehold.co/400x533" },
  { name: "Person X", role: "Rolle Y", image: "https://placehold.co/400x533" },
  { name: "Person X", role: "Rolle Y", image: "https://placehold.co/400x533" },
  { name: "Person X", role: "Rolle Y", image: "https://placehold.co/400x533" },
];

const shows = [
  new Date(2026, 5, 5, 19, 0),
  new Date(2026, 5, 6, 14, 0),
  new Date(2026, 5, 6, 19, 0),
  new Date(2026, 5, 7, 18, 0),
  new Date(2026, 5, 12, 19, 0),
  new Date(2026, 5, 13, 14, 0),
  new Date(2026, 5, 13, 19, 0),
  new Date(2026, 5, 14, 18, 0),
];
</script>

<template>
  <main class="relative overflow-hidden">
    <BackgroundSection
      id="cfa-background-map"
      :image="backgroundMapUrl"
      :placeholder="backgroundMapLqip"
      cover
      class="fixed inset-0 origin-[20%_33%] bg-fixed bg-position-[20%_33%]"
    />

    <div class="isolate">
      <div class="flex w-full flex-col items-center justify-center gap-4 p-4 lg:mb-32">
        <!-- StageInk Logo -->
        <SiteLogo
          class="aura block aura-black/25 lg:self-start"
        />

        <!-- Come From Away Logo -->
        <FlatCard
          class="w-full max-w-md"
          transparent
          shadow
        >
          <template #image>
            <img
              class="w-full"
              :src="cfaLogoUrl"
              alt="Come From Away"
            >
          </template>
        </FlatCard>
      </div>

      <!-- Trailer Video -->
      <SectionContainer>
        <FlatCard
          class="w-full"
          shadow
        >
          <template #image>
            <img src="https://placehold.co/800x540">
          </template>
        </FlatCard>
      </SectionContainer>

      <!-- Cast -->
      <SectionContainer>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <CastCard
            v-for="member, i in cast"
            :key="i"
            :image="member.image"
            :name="member.name"
            :role="member.role"
          />
        </div>
      </SectionContainer>

      <!-- Spielzeiten & Spielort -->
      <SectionContainer>
        <div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          <FlatCard
            title="Spielzeiten"
            shadow
          >
            <ShowDates :shows="shows" />
          </FlatCard>

          <FlatCard
            title="Spielort"
            shadow
          >
            <template #image>
              <img src="https://placehold.co/800x540">
            </template>
          </FlatCard>
        </div>
      </SectionContainer>

      <PlaneScroller />
    </div>
  </main>
</template>

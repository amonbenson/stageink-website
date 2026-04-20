<script setup>
import BackgroundSection from "@/components/BackgroundSection.vue";
import FlatCard from "@/components/FlatCard.vue";
import RoundButton from "@/components/RoundButton.vue";
import SectionContainer from "@/components/SectionContainer.vue";
import ShowDates from "@/components/ShowDates.vue";
import SiteLogo from "@/components/SiteLogo.vue";
import { useScrollTimeline } from "@/composables/useScrollTimeline.js";

import { shuffle } from "../../utils/shuffle";
import backgroundMap from "./assets/backgroundMap.png?lqip&quality=100";
import cfaLogo from "./assets/cfaLogo.png?lqip&lqipsize=200";
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
  { name: "Sven Edthofer", roles: ["Claude", "Derm", "Brendas Bruder"], image: "https://placehold.co/400x500" },
  { name: "Sophia Blume", roles: ["Bonnie", "Martha"], image: "https://placehold.co/400x500" },
  { name: "Francesca Valetta", roles: ["Beulah", "Delores", "Brenda"], image: "https://placehold.co/400x500" },
  { name: "Fidias Curiel", roles: ["Oz", "Joey", "Mr. Michaels", "Rabbi", "Matty"], image: "https://placehold.co/400x500" },
  { name: "Daniel Wollförster", roles: ["Doug", "Eddie", "Robin"], image: "https://placehold.co/400x500" },
  { name: "Josephine Lichel", roles: ["Janice", "Flugbegleiterin"], image: "https://placehold.co/400x500" },
  { name: "Kristin \"Kae\" Knillmann", roles: ["Annette", "Beverly"], image: "https://placehold.co/400x500" },
  { name: "Chris Zieroth", roles: ["Garth", "Kevin J.", "Chef-Kardiologe"], image: "https://placehold.co/400x500" },
  { name: "Yasmina Giebeler", roles: ["Diane", "Crystal"], image: "https://placehold.co/400x500" },
  { name: "Felix Moebus", roles: ["Nick"], image: "https://placehold.co/400x500" },
  { name: "Matthias Busch", roles: ["Kevin T.", "Captain Bristol"], image: "https://placehold.co/400x500" },
  { name: "Joël-Edmond Kenfack Nguetsop", roles: ["Kevin T.", "Captain Bristol"], image: "https://placehold.co/400x500" },
  { name: "Christine Milo", roles: ["Hannah", "Margie", "Micky"], image: "https://placehold.co/400x500" },
  { name: "Fitim Qenaj", roles: ["Dwight", "Ali"], image: "https://placehold.co/400x500" },
];

// Shuffle cast entries in-place
shuffle(cast);

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
      :src="backgroundMap"
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
        <div class="aura w-full max-w-md aura-black/25">
          <LqipImage
            class="w-full"
            :src="cfaLogo"
            alt="Come From Away"
            transparent
          />
        </div>
      </div>

      <!-- Trailer Video -->
      <SectionContainer>
        <FlatCard
          class="w-full"
          shadow
        >
          <template #image>
            <img src="https://placehold.co/800x450">
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
            :roles="member.roles"
          />
        </div>
      </SectionContainer>

      <!-- Spielzeiten & Spielort -->
      <SectionContainer class="-mb-4">
        <div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          <FlatCard
            title="Spielzeiten"
            shadow
          >
            <ShowDates :shows="shows" />

            <RoundButton
              href="https://www.tickettailor.com/events/stagiesberlinev/1943079"
              style="--btn-color: var(--color-cfa-yellow); --btn-text: black;"
            >
              Tickets kaufen
            </RoundButton>
          </FlatCard>

          <FlatCard
            title="Spielort"
            shadow
          >
            <template #image>
              <img src="https://placehold.co/800x480">
            </template>
          </FlatCard>
        </div>
      </SectionContainer>

      <PlaneScroller />
    </div>
  </main>
</template>

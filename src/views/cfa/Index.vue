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
import imgAmon from "./assets/profiles/Amon_Story.jpg?format=webp&imagetools";
import imgChrimi from "./assets/profiles/Chrimi_Story.jpg?format=webp&imagetools";
import imgChris from "./assets/profiles/Chris_Story.jpg?format=webp&imagetools";
import imgDaniel from "./assets/profiles/Daniel_Story.jpg?format=webp&imagetools";
import imgFabi from "./assets/profiles/Fabi_Story.jpg?format=webp&imagetools";
import imgFelix from "./assets/profiles/Felix_Story.jpg?format=webp&imagetools";
import imgFidias from "./assets/profiles/Fidias_Story.jpg?format=webp&imagetools";
import imgFitim from "./assets/profiles/Fitim_Story.jpg?format=webp&imagetools";
import imgFranzi from "./assets/profiles/Franzi_Story.jpg?format=webp&imagetools";
import imgHannah from "./assets/profiles/Hannah_Story.jpg?format=webp&imagetools";
import imgJamila from "./assets/profiles/Jamila_Story.jpg?format=webp&imagetools";
import imgJoël from "./assets/profiles/Joel_Story.jpg?format=webp&imagetools";
import imgJoseph from "./assets/profiles/Joseph_Story.jpg?format=webp&imagetools";
import imgJosi from "./assets/profiles/Josi_Story.jpg?format=webp&imagetools";
import imgKae from "./assets/profiles/Kae_Story.jpg?format=webp&imagetools";
import imgKate from "./assets/profiles/Kate_Story.jpg?format=webp&imagetools";
import imgLukas from "./assets/profiles/Lukas_Story.jpg?format=webp&imagetools";
import imgMarco from "./assets/profiles/Marco_Story.jpg?format=webp&imagetools";
import imgMarie from "./assets/profiles/Marie_Story.jpg?format=webp&imagetools";
import imgMatthias from "./assets/profiles/Matthias_Story.jpg?format=webp&imagetools";
import imgMax from "./assets/profiles/Max_Story.jpg?format=webp&imagetools";
import imgPatrizia from "./assets/profiles/Patrizia_Story.jpg?format=webp&imagetools";
import imgPlaceholder from "./assets/profiles/Placeholder.png?format=webp&imagetools";
import imgRuben from "./assets/profiles/Ruben_Story.jpg?format=webp&imagetools";
import imgSophia from "./assets/profiles/Sophia_Story.jpg?format=webp&imagetools";
import imgSven from "./assets/profiles/Sven_Story.jpg?format=webp&imagetools";
import imgTim from "./assets/profiles/Tim_Story.jpg?format=webp&imagetools";
import imgYasmina from "./assets/profiles/Yasmina_Story.jpg?format=webp&imagetools";
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
  { name: "Sven Edthofer", roles: ["Claude", "Derm", "Brendas Bruder"], image: imgSven },
  { name: "Sophia Blume", roles: ["Bonnie", "Martha"], image: imgSophia },
  { name: "Francesca Valetta", roles: ["Beulah", "Delores", "Brenda"], image: imgFranzi },
  { name: "Fidias Curiel", roles: ["Oz", "Joey", "Mr. Michaels", "Rabbi", "Matty"], image: imgFidias },
  { name: "Daniel Wollförster", roles: ["Doug", "Eddie", "Robin"], image: imgDaniel },
  { name: "Josephine Lichel", roles: ["Janice", "Flugbegleiterin"], image: imgJosi },
  { name: "Kae Fox", roles: ["Annette", "Beverly"], image: imgKae },
  { name: "Chris Zieroth", roles: ["Garth", "Kevin J.", "Chef-Kardiologe"], image: imgChris },
  { name: "Yasmina Giebeler", roles: ["Diane", "Crystal"], image: imgYasmina },
  { name: "Felix Moebus", roles: ["Nick"], image: imgFelix },
  { name: "Matthias Busch", roles: ["Kevin T.", "Captain Bristol"], image: imgMatthias },
  { name: "Joël-Edmond Kenfack Nguetsop", roles: ["Kevin T.", "Captain Bristol"], image: imgJoël },
  { name: "Christine Milo", roles: ["Hannah", "Margie", "Micky"], image: imgChrimi },
  { name: "Fitim Qenaj", roles: ["Dwight", "Ali"], image: imgFitim },
];

const creativeTeam = [
  { name: "Matthias Busch", roles: ["Projektleitung", "Regie"], image: imgMatthias },
  { name: "Marie Hilmer", roles: ["Regieassistenz"], image: imgMarie },
  { name: "Hannah Savory", roles: ["Musikalische Leitung Gesang"], image: imgHannah },
  { name: "Kate Greer", roles: ["Choreografie"], image: imgKate },
  { name: "Fabian Menzel", roles: ["Musikalische Leitung Band"], image: imgFabi },
  { name: "Patrizia Lebek", roles: ["Sprechtraining"], image: imgPatrizia },
  { name: "Sven Edthofer", roles: ["Bühnenbild"], image: imgSven },
  { name: "Lukas Bosse", roles: ["Kostüm"], image: imgPlaceholder },
  { name: "Christine Milo", roles: ["Requisite"], image: imgChrimi },
  { name: "Josephine Lichel", roles: ["Maske"], image: imgJosi },
  { name: "Kae Fox", roles: ["Intimacy Coordination"], image: imgKae },
];

const band = [
  { name: "Fabian Menzel", roles: ["Dirigat"], image: imgFabi },
  { name: "Jamila Loutfi", roles: ["Keyboard 1"], image: imgJamila },
  { name: "Amon Benson", roles: ["Percussion"], image: imgAmon },
  { name: "Ruben O. Doering", roles: ["Mandoline", "Mandoloncello"], image: imgRuben },
  { name: "Marco Pragliola", roles: ["Gitarre"], image: imgMarco },
  { name: "Lukas Wallnig", roles: ["Bass"], image: imgLukas },
  { name: "Tim Hildebrandt", roles: ["Fiddle"], image: imgTim },
  { name: "Max Schramm", roles: ["Drums"], image: imgMax },
  { name: "Joseph Pierce", roles: ["Keyboard 2"], image: imgJoseph },
];

// Shuffle cast entries in-place
shuffle(cast);
shuffle(creativeTeam);
shuffle(band);

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
      <!-- <SectionContainer>
        <FlatCard
          class="w-full"
          shadow
        >
          <template #image>
            <img src="https://placehold.co/800x450">
          </template>
        </FlatCard>
      </SectionContainer> -->

      <!-- Cast -->
      <SectionContainer title="Cast">
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

      <!-- Kreativteam -->
      <SectionContainer title="Kreativteam">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <CastCard
            v-for="member, i in creativeTeam"
            :key="i"
            :image="member.image"
            :name="member.name"
            :roles="member.roles"
          />
        </div>
      </SectionContainer>

      <!-- Band -->
      <SectionContainer title="Band">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <CastCard
            v-for="member, i in band"
            :key="i"
            :image="member.image"
            :name="member.name"
            :roles="member.roles"
          />
        </div>
      </SectionContainer>

      <PlaneScroller class="my-16" />

      <!-- Spielzeiten & Spielort -->
      <SectionContainer class="mb-16">
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
    </div>
  </main>
</template>

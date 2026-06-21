<script setup>
import GoogleMapsEmbed from "@/components/GoogleMapsEmbed.vue";
// import ShowDates from "@/components/ShowDates.vue";
import SiteLogo from "@/components/SiteLogo.vue";
import { useScrollTimeline } from "@/composables/useScrollTimeline.js";

import { shuffle } from "../../utils/shuffle";
import backgroundMap from "./assets/backgroundMap.png?lqip&quality=100";
import cfaLogo from "./assets/cfaLogo.png?lqip&lqipsize=200";
// import imgPlaceholder from "./assets/profiles/_Placeholder.png?w=500&format=webp&imagetools";
import imgAmon from "./assets/profiles/Amon_Post.jpg?w=500&format=webp&imagetools";
import imgChrimi from "./assets/profiles/Chrimi_Post.jpg?w=500&format=webp&imagetools";
import imgChris from "./assets/profiles/Chris_Post.jpg?w=500&format=webp&imagetools";
import imgDan from "./assets/profiles/Dan_Post.jpg?w=500&format=webp&imagetools";
import imgDaniel from "./assets/profiles/Daniel_Post.jpg?w=500&format=webp&imagetools";
import imgFabi from "./assets/profiles/Fabi_Post.jpg?w=500&format=webp&imagetools";
import imgFelix from "./assets/profiles/Felix_Post.jpg?w=500&format=webp&imagetools";
import imgFidias from "./assets/profiles/Fidias_Post.jpg?w=500&format=webp&imagetools";
import imgFitim from "./assets/profiles/Fitim_Post.jpg?w=500&format=webp&imagetools";
import imgFranzi from "./assets/profiles/Franzi_Post.jpg?w=500&format=webp&imagetools";
import imgHannah from "./assets/profiles/Hannah_Post.jpg?w=500&format=webp&imagetools";
import imgJamila from "./assets/profiles/Jamila_Post.jpg?w=500&format=webp&imagetools";
import imgJoël from "./assets/profiles/Joel_Post.jpg?w=500&format=webp&imagetools";
import imgJoseph from "./assets/profiles/Joseph_Post.jpg?w=500&format=webp&imagetools";
import imgJosi from "./assets/profiles/Josi_Post.jpg?w=500&format=webp&imagetools";
import imgKae from "./assets/profiles/Kae_Post.jpg?w=500&format=webp&imagetools";
import imgKate from "./assets/profiles/Kate_Post.jpg?w=500&format=webp&imagetools";
import imgLukasB from "./assets/profiles/Lukas_B_Post.jpeg?w=500&format=webp&imagetools";
import imgLukas from "./assets/profiles/Lukas_Post.jpg?w=500&format=webp&imagetools";
import imgMarco from "./assets/profiles/Marco_Post.jpg?w=500&format=webp&imagetools";
import imgMarie from "./assets/profiles/Marie_Post.jpg?w=500&format=webp&imagetools";
import imgMatthias from "./assets/profiles/Matthias_Post.jpg?w=500&format=webp&imagetools";
import imgMax from "./assets/profiles/Max_Post.jpg?w=500&format=webp&imagetools";
import imgPatrizia from "./assets/profiles/Patrizia_Post.jpg?w=500&format=webp&imagetools";
import imgRuben from "./assets/profiles/Ruben_Post.jpg?w=500&format=webp&imagetools";
import imgSophia from "./assets/profiles/Sophia_Post.jpg?w=500&format=webp&imagetools";
import imgSven from "./assets/profiles/Sven_Post.jpg?w=500&format=webp&imagetools";
import imgTim from "./assets/profiles/Tim_Post.jpg?w=500&format=webp&imagetools";
import imgYasmina from "./assets/profiles/Yasmina_Post.jpg?w=500&format=webp&imagetools";
import CastCard from "./CastCard.vue";
import PlaneScroller from "./PlaneScroller.vue";

useScrollTimeline((timeline) => {
  const backgroundMap = document.getElementById("cfa-background-map");
  timeline.fromTo(backgroundMap, {
    scale: 1.0,
    rotation: 0,
  }, {
    scale: 2.0,
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
  { name: "Kae Fox", roles: ["Annette", "Beverley"], image: imgKae },
  { name: "Chris Zieroth", roles: ["Garth", "Kevin J.", "Chef-Kardiologe"], image: imgChris },
  { name: "Yasmina Giebeler", roles: ["Diane", "Crystal"], image: imgYasmina },
  { name: "Felix Möbus", roles: ["Nick"], image: imgFelix },
  { name: "Matthias Busch", roles: ["Kevin T.", "Captain Bristol"], image: imgMatthias },
  { name: "Joël-Edmond Kenfack Nguetsop", roles: ["Bob", "Muhumuza"], image: imgJoël },
  { name: "Christine Milo", roles: ["Hannah", "Margie", "Micky"], image: imgChrimi },
  { name: "Fitim Qenaj", roles: ["Dwight", "Ali"], image: imgFitim },
];

const creativeTeam = [
  { name: "Matthias Busch", roles: ["Projektleitung", "Regie"], image: imgMatthias },
  { name: "Marie Hilmer", roles: ["Regieassistenz"], image: imgMarie },
  { name: "Kate Greer", roles: ["Choreografie"], image: imgKate },
  { name: "Hannah Savory", roles: ["Musikalische Leitung Gesang"], image: imgHannah },
  { name: "Fabian Menzel", roles: ["Musikalische Leitung Band"], image: imgFabi },
  { name: "Lukas Bosse", roles: ["Kostüm"], image: imgLukasB },
  { name: "Josephine Lichel", roles: ["Maske"], image: imgJosi },
  { name: "Sven Edthofer", roles: ["Bühnenbild"], image: imgSven },
  { name: "Christine Milo", roles: ["Requisite"], image: imgChrimi },
  { name: "Patrizia Lebek", roles: ["Sprechtraining"], image: imgPatrizia },
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
  { name: "Dan Carpenter", roles: ["Keyboard 3"], image: imgDan },
];

// Shuffle cast entries in-place
shuffle(cast);
// shuffle(creativeTeam);
shuffle(band);

// const shows = [
//   new Date(2026, 5, 5, 19, 0),
//   new Date(2026, 5, 6, 14, 0),
//   new Date(2026, 5, 6, 19, 0),
//   new Date(2026, 5, 7, 18, 0),
//   new Date(2026, 5, 12, 19, 0),
//   new Date(2026, 5, 13, 14, 0),
//   new Date(2026, 5, 13, 19, 0),
//   new Date(2026, 5, 14, 18, 0),
// ];
</script>

<template>
  <main class="relative overflow-hidden">
    <BackgroundSection
      id="cfa-background-map"
      :src="backgroundMap"
      cover
      class="fixed top-0 left-0 h-screen w-screen origin-[20%_33%] bg-fixed bg-position-[20%_33%]"
    />

    <div class="isolate mb-32 space-y-12 lg:space-y-32">
      <div class="flex w-full flex-col items-center justify-center gap-16 p-4">
        <!-- StageInk Logo -->
        <SiteLogo
          class="aura block aura-black/25 lg:self-start"
        />

        <!-- Come From Away Logo -->
        <div class="aura w-full max-w-lg aura-black/25">
          <LqipImage
            class="w-full"
            :src="cfaLogo"
            alt="Come From Away"
            transparent
          />
        </div>
      </div>

      <!-- Ticket Button -->
      <SectionContainer>
        <div class="flex items-center justify-center">
          <RoundButton
            class="w-full max-w-lg font-bold"
            href="https://eventfrog.de/de/p/theater-buehne/theater/theaterfest-130-1-jahre-verband-berliner-amateurbuehnen-e-v-7467689106316786728.html"
            style="--btn-color: var(--color-cfa-yellow); --btn-text: black;"
          >
            Tickets kaufen
          </RoundButton>
        </div>
      </SectionContainer>

      <!-- Trailer Video -->
      <SectionContainer>
        <FlatCard
          class="w-full"
          shadow
        >
          <template #image>
            <video
              controls
              class="w-full"
            >
              <source
                src="@/views/cfa/assets/trailer.webm"
                type="video/webm"
              >
            </video>
          </template>

          <p>
            11.09.2001 Neufundland.
          </p>
          <p>
            Ein kleiner Ort an der Küste Kanadas wird am Tag des internationalen Schockmoments zur Herberge für tausende Menschen aus aller Welt, deren Flugzeuge dort landen müssen.
          </p>
          <p>
            Ein Musical über Menschlichkeit im Ausnahmezustand und die wahren Begegnungen, die daraus entstanden. Einakter ohne Pause, mit Liveband.
          </p>
        </FlatCard>
      </SectionContainer>

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

      <PlaneScroller />

      <!-- Spielzeiten & Spielort -->
      <SectionContainer>
        <div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          <FlatCard
            title="Spielzeiten"
            shadow
          >
            <!-- <ShowDates :shows="shows" /> -->

            <p>11.07.2026, 15:15 &ndash; 15:45</p>

            <RoundButton
              href="https://eventfrog.de/de/p/theater-buehne/theater/theaterfest-130-1-jahre-verband-berliner-amateurbuehnen-e-v-7467689106316786728.html"
              style="--btn-color: var(--color-cfa-yellow); --btn-text: black;"
            >
              Tickets kaufen
            </RoundButton>
          </FlatCard>

          <FlatCard
            title="Spielort"
            shadow
          >
            <div>
              <a
                href="https://pumpeberlin.de/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Jugendkulturzentrum Pumpe</strong>
              </a>
              <p>Lützowstraße 42</p>
              <p>10785 Berlin</p>
            </div>

            <div>
              <GoogleMapsEmbed
                class="aspect-video w-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.5720753810174!2d13.3553547766179!3d52.50498533734114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851b334ee4f5f%3A0xf4f3941228681144!2sJugendKulturZentrum%20PUMPE!5e0!3m2!1sen!2sde!4v1782058023460!5m2!1sen!2sde"
              />
            </div>
          </FlatCard>
        </div>
      </SectionContainer>
    </div>
  </main>
</template>

<!-- CSS scroll-driven animation alternative (no JS, compositor-thread). Requires Firefox 128+ and Chrome 115+, safari not supported yet. So we use a JS-based approach for now -->
<!--
<style>
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    @keyframes cfa-parallax {
      from { transform: scale(1) rotate(0deg); }
      to   { transform: scale(1.5) rotate(5deg); }
    }

    #cfa-background-map {
      animation: cfa-parallax linear both;
      animation-timeline: scroll(root block);
    }
  }
}
</style>
-->

<script setup>
import { gsap } from "gsap";
import { onBeforeUnmount, onMounted } from "vue";

import backgroundMapUrl from "@/assets/cfa/backgroundMap.png?format=webp&imagetools";
import cfaLogoUrl from "@/assets/cfa/cfaLogo.png?format=webp&imagetools";
import BackgroundSection from "@/components/BackgroundSection.vue";
import FlatCard from "@/components/FlatCard.vue";
import SectionContainer from "@/components/SectionContainer.vue";

let timeline = null;

function setupAnimation() {
  // kill old timeline
  if (timeline) {
    timeline.kill();
  }

  const backgroundMap = document.getElementById("cfa-background-map");

  // animate all elements
  timeline = gsap.timeline({ paused: true });
  timeline.fromTo(backgroundMap, {
    scale: 1.0,
    rotation: 0,
  }, {
    scale: 3.0,
    rotation: 10,
    ease: "power1.in",
  }, 0);

  // apply initial scroll value
  handleScroll();
}

function handleScroll() {
  // calculate progress based on scroll position
  const progress = Math.min(1, window.scrollY / (document.body.offsetHeight - window.innerHeight));

  // set timeline progress
  timeline.progress(progress);
}

function handleResize() {
  // recreate the animation when the window size changes
  setupAnimation();
}

onMounted(() => {
  document.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
  setupAnimation();
});

onBeforeUnmount(() => {
  timeline.kill();
  document.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <main class="relative overflow-hidden">
    <!-- StageInk Logo -->
    <div class="absolute top-4 right-4 left-4 z-10 flex items-center justify-center md:justify-start">
      <div class="aura aura-black/25">
        <img
          class="w-64"
          src="/images/logo.svg"
          alt="StageInk Logo"
        >
      </div>
    </div>

    <BackgroundSection
      id="cfa-background-map"
      :image="backgroundMapUrl"
      cover
      class="fixed inset-0 origin-[20%_33%] bg-fixed bg-position-[20%_33%]"
    />

    <div class="isolate">
      <!-- Come From Away Logo -->
      <div class="flex w-full items-center justify-center p-4">
        <FlatCard
          class="mt-32 w-full max-w-md xl:mt-4"
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
            <div class="flex aspect-video items-center justify-center bg-gray-800">
              Trailer
            </div>
          </template>
        </FlatCard>
      </SectionContainer>

      <!-- Cast Images -->
      <SectionContainer>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <FlatCard
            v-for="i in 6"
            :key="i"
            shadow
          >
            <template #image>
              <div class="flex aspect-3/4 w-full items-center justify-center bg-gray-800">
                Bild
              </div>
            </template>

            <div class="flex flex-col items-center justify-center gap-2 text-center text-2xl">
              <div class="uppercase">
                Person X
              </div>
              <div class="text-sm">
                ist
              </div>
              <div class="uppercase">
                Rolle Y
              </div>
            </div>
          </FlatCard>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          <FlatCard
            title="Spielzeiten"
            shadow
          >
            <div class="flex aspect-4/3 w-full items-center justify-center bg-gray-800">
              Tabelle
            </div>
          </FlatCard>

          <FlatCard
            title="Spielort"
            shadow
          >
            <template #image>
              <div class="flex aspect-4/3 w-full items-center justify-center bg-gray-800">
                Karte
              </div>
            </template>
          </FlatCard>
        </div>
      </SectionContainer>
    </div>
  </main>
</template>

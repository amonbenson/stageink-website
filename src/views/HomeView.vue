<script setup>
import { Icon } from "@iconify/vue";

import backgroundBushesUrl from "@/assets/backgroundBushes.png?format=webp&imagetools";
import backgroundBushesLqip from "@/assets/backgroundBushes.png?w=50&format=webp&inline";
import backgroundSkyUrl from "@/assets/backgroundSky.png?format=webp&imagetools";
import backgroundSkyLqip from "@/assets/backgroundSky.png?w=50&format=webp&inline";
import backgroundWallUrl from "@/assets/backgroundWall.png?format=webp&imagetools";
import givioLogo from "@/assets/givioLogo.png?format=webp&imagetools";
import paypalLogo from "@/assets/paypalLogo.png?format=webp&imagetools";
import BackgroundSection from "@/components/BackgroundSection.vue";
import SectionContainer from "@/components/SectionContainer.vue";
import ShowTimetable from "@/components/ShowTimetable.vue";
import SocialLinks from "@/components/SocialLinks.vue";

const socialLinks = [
  { label: "Instagram", icon: "simple-icons:instagram", url: "https://www.instagram.com/_stageink_/" },
  { label: "Facebook", icon: "simple-icons:facebook", url: "https://www.facebook.com/Stageink.Berlin" },
  { label: "YouTube", icon: "simple-icons:youtube", url: "https://www.youtube.com/@StagiesBerlin" },
];

const showWeekends = [
  [
    { date: new Date(2026, 5, 5), afternoon: null, evening: "19:00" },
    { date: new Date(2026, 5, 6), afternoon: "14:00", evening: "19:00" },
    { date: new Date(2026, 5, 7), afternoon: null, evening: "18:00" },
  ],
  [
    { date: new Date(2026, 5, 12), afternoon: null, evening: "19:00" },
    { date: new Date(2026, 5, 13), afternoon: "14:00", evening: "19:00" },
    { date: new Date(2026, 5, 14), afternoon: null, evening: "18:00" },
  ],
];
</script>

<template>
  <main class="overflow-hidden">
    <BackgroundSection
      :image="backgroundSkyUrl"
      :placeholder="backgroundSkyLqip"
      class="mt-[-20vw] bg-position-[35%_100%] pt-[20vw]"
      cover
      aspect="3840/2977"
    >
      <div
        class="grid w-full gap-4 p-4 [grid-template-areas:'logo'_'socials'_'timetable'] md:gap-8 md:p-8 lg:grid-cols-[1fr_auto] lg:[grid-template-areas:'logo_socials'_'timetable_socials']"
      >
        <!-- Logo -->
        <div class="flex justify-center [grid-area:logo]">
          <div class="aura mt-4 aura-sky/65 before:bottom-1/4">
            <img
              class="w-64 lg:w-96"
              src="/images/logo.svg"
              alt="StageInk Logo"
            >
          </div>
        </div>

        <!-- Social Icons -->
        <div class="[grid-area:socials]">
          <SocialLinks
            :links="socialLinks"
            class="aura aura-sky/65"
          />
        </div>

        <!-- Production Timetable -->
        <div class="justify-self-center [grid-area:timetable]">
          <ShowTimetable
            title="Come From Away"
            venue="Centre Français, 13349 Berlin"
            ticket-url="https://www.tickettailor.com/events/stagiesberlinev/1943079"
            :weekends="showWeekends"
          />
        </div>
      </div>
    </BackgroundSection>

    <BackgroundSection
      :image="backgroundBushesUrl"
      :placeholder="backgroundBushesLqip"
    >
      <!-- Welcome Text -->
      <div class="aura w-full 3xl:mt-[calc(-20vw+15rem)]">
        <SectionContainer title="Wir">
          <p>
            Stageink, gegründet 2009 in Berlin und seit 2016 als Stagies Berlin e.V. &mdash; das ist eine bunte Mischung von Menschen, die mit viel Herzblut und Engagement singen, schauspielern und tanzen. Wir bringen unterschiedlichste Musical- und Konzert-Produktionen auf große und kleine Berliner Bühnen.
          </p>
          <p>
            Highlights der letzten Jahre sind:
          </p>
          <p>
            <strong>HEATHERS</strong> (deutschsprachige Premiere)<br>
            <strong>BE MORE CHILL</strong> (neue Übersetzung)<br>
            <strong>KOPFKINO</strong> (1. Inszenierung seit UA 2017)
          </p>
        </SectionContainer>
      </div>

      <!-- No placeholder here, because the semitransparency would cause visible bleeds -->
      <BackgroundSection
        :image="backgroundWallUrl"
        cover
        aspect="3840/4799"
        align-end
        class="max-h-360 bg-top"
      >
        <div class="aura w-full">
          <SectionContainer title="Spenden">
            <p>
              Du möchtest uns finanziell unterstützen?<br>
              Wir freuen uns über deine Spende!
            </p>
            <div class="flex w-full flex-col items-center gap-4 sm:w-fit sm:flex-row sm:justify-start">
              <a
                href="https://paypal.me/Stageink"
                target="_blank"
                rel="noopener noreferrer"
                class="aura-hover flex flex-col items-center gap-1 aura-paypal/25 aura-spread-[-2rem]"
              >
                <img
                  class="h-40"
                  :src="paypalLogo"
                  alt="PayPal Logo"
                >
                <span class="text-paypal">paypal.me/stageink</span>
              </a>

              <a
                href="https://www.gooding.de/donation/stagies-e-v-stageink-56510"
                target="_blank"
                rel="noopener noreferrer"
                class="aura-hover flex flex-col items-center aura-givio/25 aura-spread-[-2rem] sm:flex-row"
              >
                <div class="flex flex-col items-center gap-1">
                  <img
                    class="h-40"
                    :src="givioLogo"
                    alt="Givio Logo"
                  >
                  <span class="text-givio">givio.org</span>
                </div>
                <ul class="list-none px-0! text-sm">
                  <li
                    v-for="item in ['Mit Spendenbescheinigung', 'Steuerlich absetzbar', 'Sichere Datenübertragung']"
                    :key="item"
                    class="flex items-center gap-1"
                  >
                    <Icon
                      icon="lucide:check"
                      class="shrink-0 text-givio"
                    />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </a>
            </div>
          </SectionContainer>
          <SectionContainer title="Kontakt">
            <address class="space-y-4 not-italic">
              <p>info[at]stageink.org</p>
              <p>
                Stagies Berlin e.V.<br>
                c/o D. Sophia Blume<br>
                Frankfurter Allee 131<br>
                10365 Berlin
              </p>
            </address>
          </SectionContainer>
        </div>
      </BackgroundSection>
    </BackgroundSection>
  </main>
</template>

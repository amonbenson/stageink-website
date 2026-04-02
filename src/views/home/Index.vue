<script setup>
import BackgroundSection from "@/components/BackgroundSection.vue";
import RoundButton from "@/components/RoundButton.vue";
import SectionContainer from "@/components/SectionContainer.vue";
import ShowDates from "@/components/ShowDates.vue";
import SiteLogo from "@/components/SiteLogo.vue";
import SocialLinks from "@/components/SocialLinks.vue";

import backgroundBushes from "./assets/backgroundBushes.png?lqip";
import backgroundSky from "./assets/backgroundSky.png?lqip";
import backgroundWall from "./assets/backgroundWall.png?lqip";
import DonationLinks from "./DonationLinks.vue";

const socialLinks = [
  { label: "Instagram", icon: "simple-icons:instagram", url: "https://www.instagram.com/_stageink_/" },
  { label: "Facebook", icon: "simple-icons:facebook", url: "https://www.facebook.com/Stageink.Berlin" },
  { label: "YouTube", icon: "simple-icons:youtube", url: "https://www.youtube.com/@StagiesBerlin" },
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
  <main class="overflow-hidden">
    <BackgroundSection
      :src="backgroundSky"
      class="mt-[-20vw] bg-position-[35%_100%] pt-[20vw]"
      cover
      aspect="3840/2977"
    >
      <div
        class="grid w-full gap-4 p-4 [grid-template-areas:'logo'_'socials'_'timetable'] md:gap-8 md:p-8 lg:grid-cols-[1fr_auto] lg:[grid-template-areas:'logo_socials'_'timetable_socials']"
      >
        <!-- Logo -->
        <div class="flex justify-center [grid-area:logo]">
          <SiteLogo
            class="aura mt-4 aura-sky/65 before:bottom-1/4"
            large
          />
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
          <div class="group block w-fit space-y-4 rounded-4xl bg-white/75 p-4 text-center text-black backdrop-blur-lg lg:p-8">
            <h2>Come From Away</h2>

            <p>Im <strong>Centre Français, 13349 Berlin</strong></p>

            <ShowDates :shows="shows" />

            <RoundButton
              href="https://www.tickettailor.com/events/stagiesberlinev/1943079"
              style="--btn-color: var(--color-primary); --btn-text: white;"
            >
              Tickets jetzt <strong>HIER</strong> verfügbar!
            </RoundButton>

            <RoundButton to="/cfa">
              Mehr...
            </RoundButton>
          </div>
        </div>
      </div>
    </BackgroundSection>

    <BackgroundSection :src="backgroundBushes">
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

      <BackgroundSection
        :src="backgroundWall"
        cover
        aspect="3840/4799"
        align-end
        transparent
        class="max-h-360 bg-top"
      >
        <div class="aura w-full">
          <SectionContainer title="Spenden">
            <p>
              Du möchtest uns finanziell unterstützen?<br>
              Wir freuen uns über deine Spende!
            </p>
            <DonationLinks />
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

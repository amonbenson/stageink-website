<script setup>
import SiteLogo from "@/components/SiteLogo.vue";
import SocialLinks from "@/components/SocialLinks.vue";

import backgroundBushes from "./assets/backgroundBushes.png?lqip&widths=640;1280;1920;2560";
import backgroundSky from "./assets/backgroundSky.png?lqip&widths=640;1280;1920;2560";
import backgroundWall from "./assets/backgroundWall.png?lqip&widths=640;1280;1920;2560";
import musicalNightPoster from "./assets/musicalNightPoster.png?lqip&widths=320;480;640";
import DonationLinks from "./DonationLinks.vue";
import EventCard from "./EventCard.vue";
import HeroCard from "./HeroCard.vue";

const instagramUrl = "https://www.instagram.com/_stageink_/";

const socialLinks = [
  { label: "Instagram", icon: "simple-icons:instagram", url: instagramUrl },
  { label: "Facebook", icon: "simple-icons:facebook", url: "https://www.facebook.com/Stageink.Berlin" },
  { label: "YouTube", icon: "simple-icons:youtube", url: "https://www.youtube.com/@StagiesBerlin" },
];

// Background geometry – see README › Home page backgrounds. All lengths are
// relative to the page width (cqw) because the images are scaled to it.
const toCqw = fraction => `${(fraction * 100).toFixed(2)}cqw`;

// The sky layer reaches this far (relative to the page width) above the page,
// where <main> cuts it off: it hides clouds and enlarges the image, which moves
// the Heathers poster next to the event cards on wide screens.
const SKY_TOP_CROP = 0.2;

// On phones the sky is a band of at least this height, tall enough to show the
// Heathers poster below the logo and the social links.
const SKY_MIN_HEIGHT = "30rem";

// Part of the wall image (from its top) that holds the posters. The Spenden
// content starts below it, but never further down than the cap, so very wide
// screens don't show a huge bare wall.
const WALL_POSTER_FRACTION = 0.4;
const WALL_POSTER_MAX_HEIGHT = "30rem";

const skyStyle = {
  marginTop: `-${toCqw(SKY_TOP_CROP)}`,
  // Visible part: at least the band height, and at least the image scaled to the page width minus the crop
  minHeight: `max(calc(${SKY_MIN_HEIGHT} + ${toCqw(SKY_TOP_CROP)}), ${toCqw(backgroundSky.height / backgroundSky.width)})`,
};
const wallPosterHeight = `min(${toCqw(WALL_POSTER_FRACTION * backgroundWall.height / backgroundWall.width)}, ${WALL_POSTER_MAX_HEIGHT})`;
</script>

<template>
  <!--
    One grid for the whole page. The background images are grid items placed on
    the named area lines, so each one is exactly as tall as the content it sits
    behind (see README › Home page backgrounds).
  -->
  <main
    class="@container isolate grid grid-cols-1 grid-rows-[auto_1fr_auto_auto_auto] overflow-hidden [grid-template-areas:'logo'_'socials'_'events'_'about'_'donate'] lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_1fr_auto_auto] lg:[grid-template-areas:'logo_socials'_'events_socials'_'about_about'_'donate_donate']"
  >
    <h1 class="sr-only">
      Stageink – Musicalverein Berlin
    </h1>

    <!-- Background layers. -z-20 keeps them below the aura glows (-z-10). -->

    <!--
      Sky: anchored to its bottom edge, which must never be cropped. The focus
      point keeps the Heathers poster in view: on phones it shows below the
      social links, on wide screens to the right of the event cards.
    -->
    <LqipImage
      :src="backgroundSky"
      background
      aspect-ratio="auto"
      class="-z-20 col-span-full [grid-row:logo-start/socials-end] bg-cover bg-position-[75%_100%] lg:[grid-row:logo-start/events-end] lg:bg-position-[35%_100%]"
      :style="skyStyle"
    />

    <!-- Bushes: starts right below the sky and repeats (the image is tileable) -->
    <LqipImage
      :src="backgroundBushes"
      background
      aspect-ratio="auto"
      class="-z-20 col-span-full [grid-row:events-start/donate-end] bg-size-[100%_auto] bg-top bg-repeat-y lg:[grid-row:about-start/donate-end]"
    />

    <!--
      Wall: full width, fading into the page background where the visible part of
      the image ends (at the image's bottom or the page's, whichever comes first).
      The overlay is absolutely positioned so it doesn't add to the row height.
    -->
    <LqipImage
      :src="backgroundWall"
      background
      aspect-ratio="auto"
      transparent
      class="relative -z-20 bg-size-[100%_auto] bg-top bg-no-repeat [grid-area:donate]"
    >
      <div class="absolute inset-0 flex flex-col">
        <div
          class="max-h-full w-full shrink-0 bg-linear-to-b from-transparent from-75% to-black"
          :style="{ aspectRatio: `${backgroundWall.width} / ${backgroundWall.height}` }"
        />
        <div class="w-full flex-1 bg-black" />
      </div>
    </LqipImage>

    <!-- Content -->

    <div class="flex justify-center px-4 pt-4 [grid-area:logo] md:px-8 md:pt-8">
      <SiteLogo
        class="aura mt-4 aura-sky/65 before:bottom-1/4"
        large
      />
    </div>

    <div class="self-start px-4 pt-4 [grid-area:socials] md:px-8 md:pt-8 lg:pl-0">
      <SocialLinks
        :links="socialLinks"
        class="aura flex-row aura-sky/65 lg:flex-col"
      />
    </div>

    <div class="flex w-full max-w-230 flex-col items-center gap-8 self-start justify-self-center p-4 [grid-area:events] md:p-8">
      <EventCard
        title="Musical Theatre Karaoke"
        :dates="[new Date(2026, 11, 18, 19, 0)]"
        :end="new Date(2026, 11, 18, 22, 0)"
        :venue="{
          name: 'Wein Salon',
          address: 'Schreinerstr. 59, 10247 Berlin',
          url: 'https://www.google.com/maps/search/Schreinerstr.+59,+10247+Berlin',
        }"
        :poster="musicalNightPoster"
        poster-alt="Plakat: Musical Theatre Karaoke im Wein Salon"
        :link="{ url: 'https://www.wein-salon.com/event/musical-theatre-karaoke-3/' }"
      >
        <p>
          Stageink unterstützt die Winter- und Weihnachtsausgabe des zweimonatlichen Musical-Karaoke-Abends im Wein Salon. Kommt vorbei und singt mit euren Freund*innen und Mitgliedern von Stageink bei veganen Getränke-Spezialitäten und Snacks eure liebsten winter- und weihnachtlichen Musicalsongs!
        </p>
      </EventCard>

      <HeroCard class="space-y-4 text-center">
        <div>
          <p>Danke für 8+1 Shows</p>
          <h2>Come From Away!</h2>
        </div>

        <div>
          <p>Unsere nächste Hauptproduktion wird an folgenden Terminen stattfinden:</p>
          <p>
            <b>18.–20.</b> und <b>25.–27. Juni 2027</b>
          </p>
        </div>

        <RoundButton :href="instagramUrl">
          Folge uns auf Instagram, um nichts zu verpassen!
        </RoundButton>
      </HeroCard>
    </div>

    <div class="aura w-full [grid-area:about]">
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
          <strong>COME FROM AWAY</strong> (deutschsprachige Amateur-Premiere)
        </p>
      </SectionContainer>
    </div>

    <!-- Starts below the posters on the wall; a growing donation form only pushes content below it -->
    <div
      class="[grid-area:donate]"
      :style="{ paddingTop: wallPosterHeight }"
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
    </div>
  </main>
</template>

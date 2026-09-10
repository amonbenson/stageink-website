<script setup>
import FlatCard from "@/components/FlatCard.vue";
import LqipImage from "@/components/LqipImage.vue";
import SiteLogo from "@/components/SiteLogo.vue";
import SocialLinks from "@/components/SocialLinks.vue";
import DonationLinks from "@/views/home/DonationLinks.vue";

import bmcBackdropImage from "./assets/bmcBackdrop.webp?lqip&quality=100";
import bmcPoster from "./assets/bmcPoster.jpg?lqip";
import carrieBackdropImage1 from "./assets/carrieBackdrop1.jpg?lqip&quality=100";
import carrieBackdropImage2 from "./assets/carrieBackdrop2.jpg?lqip&quality=100";
import cfaBackdropImage from "./assets/cfaBackdrop.jpg?lqip&quality=100";
import cfaPoster from "./assets/cfaPoster.jpg?lqip";
import halloweenBackground from "./assets/halloweenBackground.png?lqip&quality=100";
import halloweenPoster from "./assets/halloweenPoster.png?lqip";
import heathersBackdropImage from "./assets/heathersBackdrop.jpg?lqip&quality=100";
import heathersPoster from "./assets/heathersPoster.jpg?lqip";

const welcomeBackdrop = { src: cfaBackdropImage, opacity: 0.35 };
const donateBackdrop = { src: carrieBackdropImage2, opacity: 0.35 };
const pastProductionsBackdrop = { src: undefined, opacity: 0.0 };
const contactBackdrop = { src: carrieBackdropImage1, opacity: 0.35 };

const heathersBackdrop = { src: heathersBackdropImage, opacity: 0.25 };
const bmcBackdrop = { src: bmcBackdropImage, opacity: 0.45 };
const cfaBackdrop = { src: cfaBackdropImage, opacity: 0.45 };

const socialLinks = [
  { label: "Instagram", icon: "simple-icons:instagram", url: "https://www.instagram.com/_stageink_/" },
  { label: "Facebook", icon: "simple-icons:facebook", url: "https://www.facebook.com/Stageink.Berlin" },
  { label: "YouTube", icon: "simple-icons:youtube", url: "https://www.youtube.com/@StagiesBerlin" },
];

const halloweenTicketLink = "https://www.reservix.de/tickets-musical-verein-stagies-berlin-ev-halloween-musical-konzertabend-in-berlin-grosser-saal-gemeinschaftshaus-gropiusstadt-am-31-10-2026/e2605547";

const pastProductions = [
  {
    title: "Heathers",
    description: "Deutschsprachige Premiere",
    poster: heathersPoster,
    backdrop: heathersBackdrop,
  },
  {
    title: "Be More Chill",
    description: "Neue Übersetzung",
    poster: bmcPoster,
    backdrop: bmcBackdrop,
  },
  {
    title: "Come From Away",
    description: "Deutschsprachige Amateur-Premiere",
    poster: cfaPoster,
    backdrop: cfaBackdrop,
  },
  {
    title: "Carrie",
    description: undefined,
    poster: halloweenPoster,
    backdrop: carrieBackdropImage1,
  },
  {
    title: "Kopfkino",
    description: undefined,
    poster: halloweenPoster,
    backdrop: carrieBackdropImage2,
  },
];
</script>

<template>
  <main class="overflow-hidden">
    <header class="fixed top-0 left-0 z-10 h-36 w-full">
      <div class="section-container flex h-full flex-row items-center justify-between gap-4">
        <SiteLogo class="aura hover-scale aura-black/65 before:mb-[15%] before:rounded-full sm:mt-3 sm:-mb-2" />
        <SocialLinks
          :links="socialLinks"
          hover-effect="scale"
          class="aura flex-row aura-black/65"
        />
      </div>
    </header>

    <div class="h-36 bg-black" />

    <BackgroundSection
      :src="halloweenBackground"
      cover
      transparent
      class="aspect-auto! bg-[#4f2d5f] bg-blend-darken shadow-2xl shadow-black"
    >
      <!--<div class="bg-linear-to-b from-[#58256c] via-[#8f655d] to-[#c2a53d] shadow-[inset_0_1rem_1rem_-1rem_black,inset_0_-1rem_1rem_-1rem_black]">-->
      <SectionContainer>
        <div class="flex flex-col items-center justify-center gap-8 py-4 sm:flex-row sm:justify-between">
          <div class="w-full space-y-4">
            <h2>Halloween Musical Nacht</h2>
            <p>
              In der Nacht der Geister und Dämonen bringen 5 Berliner Musical-Gruppen das Gemeinschaftshaus Gropiustadt zum Erschauern und zum Feiern.
              Stageink (Stagies Berlin e.V.), Encore! Musicals Berlin e.V., TAMUTHEA e.V., Musical Theater Society Berlin und der Berlin Stage Company e.V. präsentieren Gruseliges aus Musical und Popkultur.
            </p>
            <RoundButton
              :href="halloweenTicketLink"
              class="px-12 sm:inline-block"
              style="--btn-color: #f1c938; --btn-text: black;"
            >
              Tickets
            </RoundButton>
          </div>
          <a
            :href="halloweenTicketLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LqipImage
              :src="halloweenPoster"
              class="max-h-100 cursor-pointer shadow-xl transition-transform hover:scale-105"
            />
          </a>
        </div>
      </SectionContainer>
    </BackgroundSection>

    <SectionContainer
      v-backdrop="welcomeBackdrop"
      title="Wir"
      class="min-height-section pt-64"
    >
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

    <SectionContainer
      v-backdrop="pastProductionsBackdrop"
      title="Vergangene Produktionen"
      class="min-height-section"
    >
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="production in pastProductions"
          :key="production.title"
          v-backdrop.hover="production.backdrop"
          class="h-fit w-full hover-scale cursor-pointer bg-black p-2 shadow-2xl shadow-black"
        >
          <div class="w-full bg-gray-100 p-4 shadow-[inset_0_0_1rem_-0.2rem_black]">
            <LqipImage
              :src="production.poster"
              class="w-full object-cover"
              aspect-ratio="2/3"
            />
          </div>
        </div>
      </div>
      <!--  <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <FlatCard
          v-for="production in pastProductions"
          :key="production.title"
          v-backdrop.hover="production.backdrop"
          :title="production.title"
          :image="production.poster"
          class="peer w-full hover-scale cursor-pointer"
          shadow
        >
          <template #image>
            <LqipImage
              :src="production.poster"
              class="w-full object-cover"
              aspect-ratio="3/4"
            />
          </template>
        </FlatCard>
      </div> -->
    </SectionContainer>

    <SectionContainer
      v-backdrop="donateBackdrop"
      title="Spenden"
      class="min-height-section"
    >
      <p>
        Du möchtest uns finanziell unterstützen?<br>
        Wir freuen uns über deine Spende!
      </p>
      <DonationLinks />
    </SectionContainer>

    <SectionContainer
      v-backdrop="contactBackdrop"
      title="Kontakt"
      class="pb-64"
    >
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
  </main>
</template>

<script setup>
// import ShowDates from "@/components/ShowDates.vue";
import LqipImage from "@/components/LqipImage.vue";
import SiteLogo from "@/components/SiteLogo.vue";
import SocialLinks from "@/components/SocialLinks.vue";

import backgroundBushes from "./assets/backgroundBushes.png?lqip";
import backgroundSky from "./assets/backgroundSky.png?lqip";
import backgroundWall from "./assets/backgroundWall.png?lqip";
import halloweenPoster from "./assets/halloweenPoster.png?lqip";
import DonationLinks from "./DonationLinks.vue";

const socialLinks = [
  { label: "Instagram", icon: "simple-icons:instagram", url: "https://www.instagram.com/_stageink_/" },
  { label: "Facebook", icon: "simple-icons:facebook", url: "https://www.facebook.com/Stageink.Berlin" },
  { label: "YouTube", icon: "simple-icons:youtube", url: "https://www.youtube.com/@StagiesBerlin" },
];

/*
const shows = [
  new Date(2027, 5, 18, 19, 0),
  new Date(2027, 5, 19, 13, 30),
  new Date(2027, 5, 19, 19, 0),
  new Date(2027, 5, 20, 18, 0),
  new Date(2027, 5, 25, 19, 0),
  new Date(2027, 5, 26, 13, 30),
  new Date(2027, 5, 26, 19, 0),
  new Date(2027, 5, 27, 18, 0),
];
*/

const halloweenTicketLink = "https://www.reservix.de/tickets-musical-verein-stagies-berlin-ev-halloween-musical-konzertabend-in-berlin-grosser-saal-gemeinschaftshaus-gropiusstadt-am-31-10-2026/e2605547";
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
            class="aura flex-row aura-sky/65 lg:flex-col"
          />
        </div>

        <!-- Production Timetable -->
        <div class="flex max-w-230 flex-col items-center gap-8 justify-self-center [grid-area:timetable]">
          <div class="group flex w-full flex-col gap-4 rounded-4xl bg-white/75 p-4 text-justify text-black backdrop-blur-lg lg:p-8">
            <div>
              <h2 class="text-center!">
                Halloween Musical Nacht
              </h2>

              <p class="text-center!">
                31.10.2026, 19:00 Uhr
              </p>
            </div>

            <div class="flex flex-col items-center gap-4 sm:flex-row">
              <div class="flex h-full flex-col justify-between gap-4">
                <div>
                  <p>
                    Berlin ist Musicalhauptstadt, wenn man neben den großen Häusern schaut. 5 Gruppen aus der Fülle an Musiktheater-Vereinen und -Projekten bringen am 31.10.2026 das Gemeinschaftshaus zum Erschauern und zum Feiern.
                  </p>

                  <p>
                    Stageink (Stagies Berlin e.V.), Encore! Musicals Berlin e.V., TAMUTHEA e.V., Musical Theater Society Berlin und der Berlin Stage Company e.V. präsentieren Gruseliges aus Musical und Popkultur auf der großen Bühne.
                  </p>
                </div>

                <RoundButton
                  :href="halloweenTicketLink"
                  style="--btn-color: var(--color-primary); --btn-text: white;"
                >
                  Tickets
                </RoundButton>
              </div>

              <div>
                <a
                  :href="halloweenTicketLink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LqipImage
                    :src="halloweenPoster"
                    class="w-full cursor-pointer shadow-xl sm:w-auto sm:max-w-72"
                  />
                </a>
              </div>
            </div>
          </div>
          <div class="group block w-full space-y-4 rounded-4xl bg-white/75 p-4 text-center text-black backdrop-blur-lg lg:p-8">
            <div>
              <p>Danke für 8+1 Shows</p>

              <h2 class="text-center!">
                Come From Away!
              </h2>
            </div>

            <div>
              <p>Unsere nächste Hauptproduktion wird an folgenden Terminen stattfinden:</p>

              <p>
                <b>18. - 20</b> und <b>25. - 27. Juni 2027</b>
              </p>
            </div>

            <!-- <ShowDates :shows="shows" /> -->

            <!-- <RoundButton to="/cfa/">
              Zur Projektseite
            </RoundButton> -->

            <RoundButton href="https://www.instagram.com/_stageink_/">
              Folge uns auf Instagram, um nichts zu verpassen!
            </RoundButton>
          </div>
        </div>
      </div>
    </BackgroundSection>

    <BackgroundSection :src="backgroundBushes">
      <!-- Welcome Text -->
      <!-- <div class="aura w-full 3xl:mt-[calc(-20vw+15rem)]"> -->
      <div class="aura w-full">
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

<script setup>
// import ShowDates from "@/components/ShowDates.vue";
import LqipImage from "@/components/LqipImage.vue";
import SiteLogo from "@/components/SiteLogo.vue";
import SocialLinks from "@/components/SocialLinks.vue";

import backgroundBushes from "./assets/backgroundBushes.png?lqip";
import backgroundSky from "./assets/backgroundSky.png?lqip";
import backgroundWall from "./assets/backgroundWall.png?lqip";
import musicalNightPoster from "./assets/musicalNightPoster.png?lqip";
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
          <article class="flex w-full flex-col gap-6 rounded-4xl bg-white/75 p-4 text-black backdrop-blur-lg sm:flex-row sm:items-center lg:gap-8 lg:p-8">
            <div class="flex flex-1 flex-col gap-4">
              <header class="space-y-1">
                <h2>Musical Theatre Karaoke</h2>

                <p class="font-bold">
                  <time datetime="2026-12-18T19:00">18.12.2026, 19:00 &ndash; 22:00 Uhr</time>
                </p>

                <address class="not-italic">
                  <a
                    href="https://www.google.com/maps/search/Schreinerstr.+59,+10247+Berlin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary underline-offset-4 hover:underline"
                  >
                    Wein Salon, Schreinerstr. 59, 10247 Berlin
                  </a>
                </address>
              </header>

              <p class="text-justify">
                Stageink unterstützt die Winter- und Weihnachtsausgabe des zweimonatlichen Musical-Karaoke-Abends im Wein Salon. Kommt vorbei uns singt mit euren Freund*innen und Mitgliedern von Stageink bei veganen Getränke-Spezialitäten und Snacks eure liebsten winter- und weihnachtlichen Musicalsongs!
              </p>
            </div>

            <a
              href="https://www.wein-salon.com/event/musical-theatre-karaoke-3/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full max-w-56 shrink-0 self-center lg:w-56"
            >
              <LqipImage
                :src="musicalNightPoster"
                alt="Plakat: Musical Theatre Karaoke im Wein Salon"
                class="w-full shadow-xl"
              />
            </a>
          </article>

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

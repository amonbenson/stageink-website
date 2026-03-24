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
import ShowTimetable from "@/components/ShowTimetable.vue";
import SocialLinks from "@/components/SocialLinks.vue";

import SectionContainer from "../components/SectionContainer.vue";

const socialLinks = [
  { label: "Instagram", icon: "simple-icons:instagram", url: "https://www.instagram.com/_stageink_/" },
  { label: "Facebook", icon: "simple-icons:facebook", url: "https://www.facebook.com/Stageink.Berlin" },
  { label: "YouTube", icon: "simple-icons:youtube", url: "https://www.youtube.com/@StagiesBerlin" },
];

const showWeekends = [
  [
    { date: new Date(2025, 5, 5), afternoon: null, evening: "19:00" },
    { date: new Date(2025, 5, 6), afternoon: "14:00", evening: "19:00" },
    { date: new Date(2025, 5, 7), afternoon: null, evening: "18:00" },
  ],
  [
    { date: new Date(2025, 5, 12), afternoon: null, evening: "19:00" },
    { date: new Date(2025, 5, 13), afternoon: "14:00", evening: "19:00" },
    { date: new Date(2025, 5, 14), afternoon: null, evening: "18:00" },
  ],
];
</script>

<template>
  <main class="overflow-hidden">
    <BackgroundSection
      :image="backgroundSkyUrl"
      :placeholder="backgroundSkyLqip"
      class="bg-position-[35%_50%]"
      cover
      aspect="3840/2977"
    >
      <div
        class="grid w-full gap-4 p-4 [grid-template-areas:'logo'_'socials'_'timetable'] md:gap-8 md:p-8 lg:grid-cols-[1fr_auto] lg:[grid-template-areas:'logo_socials'_'timetable_socials']"
      >
        <!-- Logo -->
        <div class="flex justify-center [grid-area:logo]">
          <div class="aura aura-sky/65 before:bottom-1/4">
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

    <footer>
      <SectionContainer
        title="Haftungsausschluss"
        class="isolate"
        collapsible
      >
        <h3>Haftung für Inhalte</h3>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
        </p>
        <h3>Haftung für Links</h3>
        <p>
          Unsere Website enthält Links zu externen Websites Dritter. Auf deren Inhalte haben wir keinen Einfluss. Für diese fremden Inhalte übernehmen wir keine Gewähr.
        </p>
        <h3>Urheberrecht</h3>
        <p>
          Die auf dieser Website veröffentlichten Inhalte, Texte, Bilder und sonstigen Werke unterliegen dem deutschen Urheberrecht und liegen, soweit nicht anders angegeben, beim Stagies Berlin e. V. oder den jeweils genannten Urheberinnen und Urhebern. Jede Vervielfältigung, Bearbeitung, Verbreitung oder sonstige Verwertung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des Stagies Berlin e. V. bzw. der jeweiligen Rechteinhaber. Inhalte Dritter werden als solche gekennzeichnet und ihre Urheberrechte beachtet. Sollten Sie dennoch auf eine mögliche Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir die betreffenden Inhalte umgehend entfernen.
        </p>
        <h3>Datenschutzerklärung</h3>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist der Stagies Berlin e. V., weitere Kontaktdaten können dem Impressum entnommen werden.
        </p>
        <p>
          Beim Besuch unserer Website werden durch den Hostinganbieter automatisch Informationen in sogenannten Server-Logfiles erfasst. Diese Daten werden automatisch durch Ihren Browser übermittelt und umfassen typischerweise:
        </p>
        <ul>
          <li>IP-Adresse des anfragenden Geräts</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Name und URL der abgerufenen Datei</li>
          <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
          <li>verwendeter Browser und ggf. das Betriebssystem Ihres Geräts</li>
        </ul>
        <p>
          Diese Daten dienen ausschließlich der Sicherstellung eines störungsfreien Betriebs der Website sowie der Systemsicherheit und -stabilität. Eine Zusammenführung dieser Daten mit anderen Datenquellen erfolgt nicht.
        </p>
        <p>
          Rechtsgrundlage der Verarbeitung ist Art. 6 Abs. 1 lit. f der Datenschutz-Grundverordnung. Unser berechtigtes Interesse liegt in der technisch fehlerfreien Darstellung und der Sicherheit unserer Website.
        </p>
        <p>
          Eine Übermittlung Ihrer personenbezogenen Daten an Dritte erfolgt grundsätzlich nicht, außer wenn dies gesetzlich erforderlich ist oder zur technischen Bereitstellung der Website (z. B. durch unseren Hostinganbieter).
        </p>
        <p>
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:
        </p>
        <ul>
          <li>Auskunft über Ihre gespeicherten personenbezogenen Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>Löschung Ihrer Daten</li>
          <li>Einschränkung der Verarbeitung</li>
          <li>Widerspruch gegen die Verarbeitung</li>
          <li>Datenübertragbarkeit</li>
        </ul>
        <p>
          Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen Datenschutzrecht verstößt, haben Sie zudem das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.
        </p>
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Website umzusetzen.
        </p>
      </SectionContainer>
    </footer>
  </main>
</template>

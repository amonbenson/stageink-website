<script setup>
import backgroundBushesUrl from "@/assets/backgroundBushes.png?format=webp&imagetools";
import backgroundSkyUrl from "@/assets/backgroundSky.png?format=webp&imagetools";
import backgroundWallUrl from "@/assets/backgroundWall.png?format=webp&imagetools";
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
      cover
      aspect="3840/2977"
    >
      <div
        class="grid w-full gap-4 p-4 [grid-template-areas:'logo'_'socials'_'timetable'] md:gap-8 md:p-8 lg:grid-cols-[1fr_auto] lg:[grid-template-areas:'logo_socials'_'timetable_socials']"
      >
        <!-- Logo -->
        <div class="flex justify-center [grid-area:logo]">
          <div class="bg-blob-sky before:bottom-1/4">
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
            class="bg-blob-sky"
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

    <BackgroundSection :image="backgroundBushesUrl">
      <!-- Welcome Text -->
      <SectionContainer
        title="Wir"
        class="bg-blob"
      >
        <p>
          Stageink, gegründet 2009 in Berlin und seit 2016 als Stagies Berlin e.V. &mdash; das ist eine bunte Mischung von Menschen, die mit viel Herzblut und Engagement singen, schauspielern und tanzen. Wir bringen unterschiedlichste Musical- und Konzert-Produktionen auf große und kleine Berliner Bühnen. <span>Mehr dazu...</span><!-- TODO: add link -->
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

      <BackgroundSection
        :image="backgroundWallUrl"
        cover
        aspect="3840/4799"
        align-end
      >
        <div class="bg-blob w-full">
          <section class="section-container">
            <h2>Spenden</h2>
            <p>
              Du möchtest uns finanziell unterstützen?<br>
              Wir freuen uns über deine Spende!
            </p>
            <div class="flex w-fit items-center justify-start gap-4">
              <a
                href="https://paypal.me/Stageink"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col items-center gap-1"
              >
                <img
                  class="h-40"
                  :src="paypalLogo"
                  alt="PayPal Logo"
                >
                <span>paypal.me/stageink</span>
              </a>

              <iframe
                title="Gooding Banner-Widget"
                width="300"
                height="250"
                loading="lazy"
                class="origin-top-left rounded-xl border-0"
                src="https://erweiterungen.gooding.de/app/widget/stagies-e-v-stageink-56510/medium-rectangle/tab/1/donations/1/v/1712678994.7kOLHJlrcY0f%252FXGTwckbNvNwYHNwmZ0LUrw9R2mdNEaiUaKmCALFNd4JKOE5QWtI6jfyfLSVZuySKZbp6yXonUmJK6No0QftSlMwze0tLxUykQ7SYCQdqVKPmKaQjyFM"
              />
            </div>
          </section>
          <section class="section-container">
            <h2>Kontakt</h2>
            <address>
              <p>info[at]stageink.org</p>
              <p>
                Stagies Berlin e.V.<br>
                c/o D. Sophia Blume<br>
                Frankfurter Allee 131<br>
                10365 Berlin
              </p>
            </address>
          </section>
        </div>
      </BackgroundSection>
    </BackgroundSection>

    <footer>
      <SectionContainer
        title="Haftungsausschluss"
        class="isolate"
        collapsible
      >
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
          allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
          verpflichtet,
          übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen,
          die
          auf eine
          rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen
          nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
          ab
          dem
          Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
          entsprechenden
          Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>
        <h3>Haftung für Links</h3>
        <p>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss
          haben.
          Deshalb
          können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten
          ist
          stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden
          zum
          Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
          Zeitpunkt der
          Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch
          ohne
          konkrete
          Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden
          wir
          derartige Links umgehend entfernen.
        </p>
        <h3>Urheberrecht</h3>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
          deutschen
          Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb
          der
          Grenzen
          des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          Downloads und
          Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die
          Inhalte auf
          dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.
          Insbesondere werden
          Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
          aufmerksam
          werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden
          wir
          derartige Inhalte umgehend entfernen.
        </p>
        <p>
          Quellenangaben: eRecht24
        </p>
        <h3>Datenschutzerklärung</h3>
        <h4>Datenschutz</h4>
        <p>
          Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit
          auf
          unseren
          Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden,
          erfolgt dies,
          soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung
          nicht an
          Dritte weitergegeben.
        </p>
        <p>
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
          Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
          nicht
          möglich.
        </p>
        <p>
          Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur
          Übersendung von
          nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich
          widersprochen.
          Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten
          Zusendung von
          Werbeinformationen, etwa durch Spam-Mails, vor.
        </p>
        <h4>Datenschutzerklärung für die Nutzung von Facebook-Plugins (Like-Button)</h4>
        <p>
          Auf unseren Seiten sind Plugins des sozialen Netzwerks Facebook (Facebook Inc., 1601 Willow Road,
          Menlo
          Park,
          California, 94025, USA) integriert. Die Facebook-Plugins erkennen Sie an dem Facebook-Logo oder dem
          "Like-Button" ("Gefällt mir") auf unserer Seite. Eine Übersicht über die Facebook-Plugins finden Sie
          hier:
          http://developers.facebook.com/docs/plugins/.<br>
          Wenn Sie unsere Seiten besuchen, wird über das Plugin eine direkte Verbindung zwischen Ihrem Browser
          und
          dem
          Facebook-Server hergestellt. Facebook erhält dadurch die Information, dass Sie mit Ihrer IP-Adresse
          unsere Seite
          besucht haben. Wenn Sie den Facebook "Like-Button" anklicken während Sie in Ihrem Facebook-Account
          eingeloggt
          sind, können Sie die Inhalte unserer Seiten auf Ihrem Facebook-Profil verlinken. Dadurch kann
          Facebook
          den
          Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der
          Seiten
          keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Facebook erhalten.
          Weitere
          Informationen hierzu finden Sie in der Datenschutzerklärung von facebook unter
          http://de-de.facebook.com/policy.php
        </p>
        <p>
          Wenn Sie nicht wünschen, dass Facebook den Besuch unserer Seiten Ihrem Facebook-Nutzerkonto zuordnen
          kann,
          loggen Sie sich bitte aus Ihrem Facebook-Benutzerkonto aus.
        </p>
        <h4>Datenschutzerklärung für die Nutzung von Twitter</h4>
        <p>
          Auf unseren Seiten sind Funktionen des Dienstes Twitter eingebunden. Diese Funktionen werden
          angeboten
          durch die
          Twitter Inc., Twitter, Inc. 1355 Market St, Suite 900, San Francisco, CA 94103, USA. Durch das
          Benutzen
          von
          Twitter und der Funktion "Re-Tweet" werden die von Ihnen besuchten Webseiten mit Ihrem
          Twitter-Account
          verknüpft
          und anderen Nutzern bekannt gegeben. Dabei werden auch Daten an Twitter übertragen.
        </p>
        <p>
          Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten
          Daten sowie
          deren Nutzung durch Twitter erhalten. Weitere Informationen hierzu finden Sie in der
          Datenschutzerklärung von
          Twitter unter http://twitter.com/privacy.
        </p>
        <p>
          Ihre Datenschutzeinstellungen bei Twitter können Sie in den Konto-Einstellungen unter
          http://twitter.com/account/settings ändern.
        </p>
        <p>
          Quellenangaben: eRecht24, Facebook-Disclaimer von eRecht24, Datenschutzerklärung Twitter
        </p>
      </SectionContainer>
    </footer>
  </main>
</template>

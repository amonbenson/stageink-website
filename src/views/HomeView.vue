<script setup>
import backgroundBushesUrl from "@/assets/backgroundBushes.png?format=webp&imagetools";
import backgroundSkyUrl from "@/assets/backgroundSky.png?format=webp&imagetools";
import backgroundWallUrl from "@/assets/backgroundWall.png?format=webp&imagetools";
import paypalLogo from "@/assets/paypalLogo.png?format=webp&imagetools";

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

const formatWeekday = date => date.toLocaleDateString("de-DE", { weekday: "short" }).replace(".", "");
const formatDate = date => date.toLocaleDateString("de-DE", { day: "numeric", month: "numeric" });
</script>

<template>
  <div>
    <div
      class="aspect-3840/2977 w-full bg-cover"
      :style="{
        backgroundImage: `url(${backgroundSkyUrl})`,
      }"
    >
      <!-- Logo + Socials block -->
      <div
        class="grid w-full gap-4 p-4 [grid-template-areas:'logo'_'socials'_'timetable'] md:gap-8 md:p-8 lg:grid-cols-[1fr_auto] lg:[grid-template-areas:'logo_socials'_'timetable_socials']"
      >
        <!-- Logo Image -->
        <div class="flex justify-center [grid-area:logo]">
          <img
            class="w-32 fill-light sm:w-64 lg:w-96"
            src="/images/logo.svg"
            alt="StageInk Logo"
          >
          <!-- <span class="absolute left-[53%] top-[69%] text-1xl sm:text-2xl">Musicalverein<br>Berlin</span> -->
        </div>

        <!-- Social Icons -->
        <div class="flex flex-row items-center justify-center gap-6 [grid-area:socials] lg:flex-col lg:justify-start">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
        </div>

        <!-- Production Timetable -->
        <a
          href="https://www.tickettailor.com/events/stagiesberlinev/1943079"
          target="_blank"
          rel="noopener noreferrer"
          class="w-fit space-y-4 justify-self-center bg-dark/75 p-4 text-center [grid-area:timetable] md:p-8"
        >
          <h2>
            Come From Away
          </h2>
          <p>Im <strong>Centre Français, 13349 Berlin</strong></p>
          <div class="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1 tabular-nums">
            <template
              v-for="(weekend, wi) in showWeekends"
              :key="wi"
            >
              <div
                v-if="wi > 0"
                class="col-span-3 h-3"
              />
              <template
                v-for="show in weekend"
                :key="show.date.getTime()"
              >
                <div class="text-start">
                  {{ formatWeekday(show.date) }} {{ formatDate(show.date) }}
                </div>
                <div class="text-end">
                  {{ show.afternoon ?? '' }}
                </div>
                <div class="text-end">
                  {{ show.evening }}
                </div>
              </template>
            </template>
          </div>
          <p>TICKETS jetzt <strong>HIER</strong> verfügbar!</p>
        </a>
      </div>
    </div>

    <div
      class="flex w-full flex-col items-center bg-size-[100%_auto]"
      :style="{
        backgroundImage: `url(${backgroundBushesUrl})`,
      }"
    >
      <!-- Welcome Text -->
      <div class="w-full max-w-4xl space-y-4 p-4 text-justify md:px-8 lg:px-16">
        <h2>Wir</h2>
        <p>
          Stageink, gegründet 2009 in Berlin und seit 2016 als Stagies Berlin e.V. &mdash; das ist eine bunte Mischung von Menschen, die mit viel Herzblut und Engagement singen, schauspielern und tanzen. Wir bringen unterschiedlichste Musical- und Konzert-Produktionen auf große und kleine Berliner Bühnen. <a>Mehr dazu...</a>
        </p>
        <p>
          Highlights der letzten Jahre sind:
        </p>
        <p>
          <strong>HEATHERS</strong> (deutschsprachige Premiere)<br>
          <strong>BE MORE CHILL</strong> (neue Übersetzung)<br>
          <strong>KOPFKINO</strong> (1. Inszenierung seit UA 2017)
        </p>
      </div>

      <div
        class="flex aspect-3840/4799 w-full flex-col items-center justify-end bg-cover"
        :style="{
          backgroundImage: `url(${backgroundWallUrl})`,
        }"
      >
        <div class="w-full max-w-4xl space-y-4 p-4 text-justify md:px-8 lg:px-16">
          <h2>Spenden</h2>
          <p>
            Du möchtest uns finanziell unterstützen?<br>
            Wir freuen uns über deine Spende!
          </p>
          <div class="flex items-center justify-start gap-4">
            <a
              href="https://paypal.me/Stageink"
              target="_blank"
              rel="noopener noreferrer"
              class="flex flex-col items-center gap-1"
            >
              <img
                class="h-20 md:h-40"
                :src="paypalLogo"
                alt="PayPal Logo"
              >
              <span>paypal.me/stageink</span>
            </a>

            <div class="h-[125px] w-[150px] md:h-auto md:w-auto">
              <iframe
                id="Gooding Banner-Widget"
                width="300"
                height="250"
                name="Gooding Banner-Widget"
                frameborder="0"
                allowtransparency="true"
                scrolling="no"
                title="Gooding Banner-Widget"
                class="origin-top-left scale-50 md:scale-100"
                src="https://erweiterungen.gooding.de/app/widget/stagies-e-v-stageink-56510/medium-rectangle/tab/1/donations/1/v/1712678994.7kOLHJlrcY0f%252FXGTwckbNvNwYHNwmZ0LUrw9R2mdNEaiUaKmCALFNd4JKOE5QWtI6jfyfLSVZuySKZbp6yXonUmJK6No0QftSlMwze0tLxUykQ7SYCQdqVKPmKaQjyFM"
              />
            </div>
          </div>
        </div>
        <div class="w-full max-w-4xl space-y-4 p-4 text-justify md:px-8 lg:px-16">
          <h2>
            Kontakt
          </h2>
          <p>info[at]stageink.org</p>
          <p>
            Stagies Berlin e.V.<br>
            c/o D. Sophia Blume<br>
            Frankfurter Allee 131<br>
            10365 Berlin
          </p>
        </div>
      </div>
    </div>

    <div class="flex w-full flex-col items-center justify-end">
      <div class="w-full max-w-4xl space-y-4 px-4 py-4 text-justify md:px-8 lg:px-16">
        <details>
          <summary>
            <h2>Haftungsausschluss</h2>
          </summary>
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
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br>
            <br>
            Haftung für Links<br>
            <br>
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
            derartige Links umgehend entfernen.<br>
            <br>
            Urheberrecht<br>
            <br>
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
            derartige Inhalte umgehend entfernen.<br>
            <br>
            <br>

            Quellenangaben: eRecht24<br>

            <br>
            Datenschutzerklärung:<br>
            <br>
            Datenschutz<br>
            <br>
            Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit
            auf
            unseren
            Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden,
            erfolgt dies,
            soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung
            nicht an
            Dritte weitergegeben.<br>
            <br>
            Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
            Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
            nicht
            möglich.<br>
            <br>
            Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur
            Übersendung von
            nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich
            widersprochen.
            Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten
            Zusendung von
            Werbeinformationen, etwa durch Spam-Mails, vor.<br>
            <br>
            <br>

            Datenschutzerklärung für die Nutzung von Facebook-Plugins (Like-Button)<br>
            <br>
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
            http://de-de.facebook.com/policy.php<br>
            <br>
            Wenn Sie nicht wünschen, dass Facebook den Besuch unserer Seiten Ihrem Facebook-Nutzerkonto zuordnen
            kann,
            loggen Sie sich bitte aus Ihrem Facebook-Benutzerkonto aus.
            <br>
            <br>

            Datenschutzerklärung für die Nutzung von Twitter<br>
            <br>
            Auf unseren Seiten sind Funktionen des Dienstes Twitter eingebunden. Diese Funktionen werden
            angeboten
            durch die
            Twitter Inc., Twitter, Inc. 1355 Market St, Suite 900, San Francisco, CA 94103, USA. Durch das
            Benutzen
            von
            Twitter und der Funktion "Re-Tweet" werden die von Ihnen besuchten Webseiten mit Ihrem
            Twitter-Account
            verknüpft
            und anderen Nutzern bekannt gegeben. Dabei werden auch Daten an Twitter übertragen.<br>
            <br>
            Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten
            Daten sowie
            deren Nutzung durch Twitter erhalten. Weitere Informationen hierzu finden Sie in der
            Datenschutzerklärung von
            Twitter unter http://twitter.com/privacy.<br>
            <br>
            Ihre Datenschutzeinstellungen bei Twitter können Sie in den Konto-Einstellungen unter
            http://twitter.com/account/settings ändern.<br>
            <br>
            <br>

            Quellenangaben: eRecht24, Facebook-Disclaimer von eRecht24, Datenschutzerklärung Twitter
          </p>
        </details>
      </div>
    </div>
  </div>
</template>

<style scoped>
summary {
  display: flex;
  align-items: center;
  cursor: pointer;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

summary::before {
  content: '▶';
  margin-right: 0.4em;
  font-size: 0.7em;
  transition: transform 0.2s;
  flex-shrink: 0;
}

details[open] > summary::before {
  transform: rotate(90deg);
}
</style>

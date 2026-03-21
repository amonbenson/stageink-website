<script setup>
import backgroundBushesUrl from "@/assets/backgroundBushes.png?format=webp&imagetools";
import backgroundSkyUrl from "@/assets/backgroundSky.png?format=webp&imagetools";
import backgroundWallUrl from "@/assets/backgroundWall.png?format=webp&imagetools";
import paypalLogo from "@/assets/paypalLogo.png?format=webp&imagetools";
</script>

<template>
  <div>
    <div
      class="aspect-3840/2977 w-full bg-cover"
      :style="{
        backgroundImage: `url(${backgroundSkyUrl})`,
      }"
    >
      <div class="flex flex-col items-center justify-start gap-16 md:flex-row md:items-start md:justify-between">
        <!-- Logo + Socials block -->
        <div class="flex w-full flex-col items-center gap-8">
          <!-- Logo Image -->
          <div class="relative w-64 sm:w-96 lg:w-128">
            <img
              class="w-full fill-light"
              src="/images/logo.svg"
              alt="StageInk Logo"
            >
            <!-- <span class="absolute left-[53%] top-[69%] text-1xl sm:text-2xl">Musicalverein<br>Berlin</span> -->
          </div>

          <!-- Social Icons -->
          <div class="text-4xl">
            (Social Icons)
          </div>
        </div>

        <!-- Current Production Image -->
        <!-- <div class="sectionbox bg-blue-500/90 p-0">
          <img
            class="w-full max-w-256"
            src="/images/cfaPoster.jpg"
            alt="StageInk Logo"
          >
        </div> -->
      </div>
    </div>

    <div
      class="flex w-full flex-col items-center bg-size-[100%_auto]"
      :style="{
        backgroundImage: `url(${backgroundBushesUrl})`,
      }"
    >
      <!-- Welcome Text -->
      <div class="w-full max-w-4xl space-y-4 px-4 pt-8 pb-16 text-justify md:px-8 lg:px-16">
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
        <div class="w-full max-w-4xl space-y-4 px-4 py-4 text-justify md:px-8 lg:px-16">
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
                class="h-32"
                :src="paypalLogo"
                alt="PayPal Logo"
              >
              <span>paypal.me/stageink</span>
            </a>

            <iframe
              id="Gooding Banner-Widget"
              width="300"
              height="250"
              name="Gooding Banner-Widget"
              frameborder="0"
              allowtransparency="true"
              scrolling="no"
              title="Gooding Banner-Widget"
              class="origin-top-left"
              src="https://erweiterungen.gooding.de/app/widget/stagies-e-v-stageink-56510/medium-rectangle/tab/1/donations/1/v/1712678994.7kOLHJlrcY0f%252FXGTwckbNvNwYHNwmZ0LUrw9R2mdNEaiUaKmCALFNd4JKOE5QWtI6jfyfLSVZuySKZbp6yXonUmJK6No0QftSlMwze0tLxUykQ7SYCQdqVKPmKaQjyFM"
            />
          </div>
          <h3 class="mb-0">
            Kontakt
          </h3>
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

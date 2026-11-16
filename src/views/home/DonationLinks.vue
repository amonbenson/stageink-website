<script setup>
import { Icon } from "@iconify/vue";

import givioLogo from "./assets/givioLogo.png?lqip";
import paypalLogo from "./assets/paypalLogo.png?lqip";
import ZeffyDonationForm from "./ZeffyDonationForm.vue";

// Color classes are written out in full so Tailwind can find them.
const donationOptions = [
  {
    name: "paypal.com",
    url: "https://www.paypal.com/donate/?hosted_button_id=WE58RGLJNLSSC",
    logo: paypalLogo,
    logoAlt: "PayPal Logo",
    textClass: "text-paypal",
    auraClass: "aura-paypal/25",
    features: [],
  },
  {
    // Intentionally links to gooding.de, where the Givio donation page lives.
    name: "givio.org",
    url: "https://www.gooding.de/donation/stagies-e-v-stageink-56510",
    logo: givioLogo,
    logoAlt: "Givio Logo",
    textClass: "text-givio",
    auraClass: "aura-givio/25",
    features: ["Mit Spendenbescheinigung", "Steuerlich absetzbar", "Sichere Datenübertragung"],
  },
];
</script>

<template>
  <div class="flex w-full flex-col items-center gap-8 pt-2 sm:max-w-xl">
    <div class="aura-hover flex w-full flex-col items-center gap-1 aura-zeffy/25 aura-spread-[-2rem]">
      <ZeffyDonationForm form-url="/embed/donation-form/hilf-uns-musical-in-berlin-auf-die-buehne-zu-bringen" />
      <a
        href="https://www.zeffy.com/de-de/home/100-free-for-donors?utm_source=freeforms_donation_desktop"
        target="_blank"
        rel="noopener noreferrer"
        class="text-zeffy"
      >
        zeffy.com
      </a>
    </div>

    <div class="flex w-full flex-col items-center gap-8 sm:flex-row sm:justify-between">
      <a
        v-for="option in donationOptions"
        :key="option.name"
        :href="option.url"
        target="_blank"
        rel="noopener noreferrer"
        class="aura-hover flex flex-col items-center aura-spread-[-2rem] sm:flex-row"
        :class="option.auraClass"
      >
        <div class="flex flex-col items-center gap-1">
          <LqipImage
            class="h-40"
            :src="option.logo"
            :alt="option.logoAlt"
            transparent
          />
          <span :class="option.textClass">{{ option.name }}</span>
        </div>

        <ul
          v-if="option.features.length"
          class="list-none px-0! text-sm"
        >
          <li
            v-for="feature in option.features"
            :key="feature"
            class="flex items-center gap-1"
          >
            <Icon
              icon="lucide:check"
              class="shrink-0"
              :class="option.textClass"
            />
            <span>{{ feature }}</span>
          </li>
        </ul>
      </a>
    </div>
  </div>
</template>

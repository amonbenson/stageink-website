<script setup>
import { Icon } from "@iconify/vue";

import givioLogo from "./assets/givioLogo.png?lqip";
import paypalLogo from "./assets/paypalLogo.png?lqip";
import ZeffyDonationForm from "./ZeffyDonationForm.vue";
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
        href="https://www.paypal.com/donate/?hosted_button_id=WE58RGLJNLSSC"
        target="_blank"
        rel="noopener noreferrer"
        class="aura-hover flex flex-col items-center gap-1 aura-paypal/25 aura-spread-[-2rem]"
      >
        <LqipImage
          class="h-40"
          :src="paypalLogo"
          alt="PayPal Logo"
          transparent
        />
        <span class="text-paypal">paypal.com</span>
      </a>

      <a
        href="https://www.gooding.de/donation/stagies-e-v-stageink-56510"
        target="_blank"
        rel="noopener noreferrer"
        class="aura-hover flex flex-col items-center aura-givio/25 aura-spread-[-2rem] sm:flex-row"
      >
        <div class="flex flex-col items-center gap-1">
          <LqipImage
            class="h-40"
            :src="givioLogo"
            alt="Givio Logo"
            transparent
          />
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
  </div>
</template>

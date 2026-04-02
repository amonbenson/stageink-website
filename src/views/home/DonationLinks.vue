<script setup>
import { Icon } from "@iconify/vue";

import givioLogo from "./assets/givioLogo.png?lqip";
import paypalLogo from "./assets/paypalLogo.png?lqip";
</script>

<template>
  <div class="flex w-full flex-col items-center gap-4 sm:w-fit sm:flex-row sm:justify-start">
    <a
      href="https://paypal.me/Stageink"
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
      <span class="text-paypal">paypal.me/stageink</span>
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
</template>

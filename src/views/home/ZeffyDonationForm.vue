<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  // Path of the donation form on zeffy.com, e.g. "/embed/donation-form/<slug>"
  formUrl: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "Ich bin damit einverstanden, dass mir das Spendenformular von Zeffy angezeigt wird. Dabei werden Daten an Zeffy und deren Dienstleister (u. a. Stripe, Google, Cloudflare) übertragen.",
  },
});

const embedScriptSrc = "https://www.zeffy.com/embed/v2/zeffy-embed.js";

// Nothing is loaded from Zeffy until the visitor consents.
const consented = ref(false);

// If the embed script fails to load (e.g. blocked), fall back to a plain iframe.
const useFallback = ref(false);
let embedScript = null;

// Vue templates can't contain <script> tags, so the embed script is injected
// once the placeholder element is in the DOM (client-side only, SSG-safe).
watch(consented, async (value) => {
  if (!value || embedScript) {
    return;
  }

  await nextTick();

  embedScript = document.createElement("script");
  embedScript.src = embedScriptSrc;
  embedScript.async = true;
  embedScript.onerror = () => {
    useFallback.value = true;
  };

  document.body.appendChild(embedScript);
});

onBeforeUnmount(() => {
  embedScript?.remove();
});
</script>

<template>
  <div class="w-full overflow-hidden rounded-4xl">
    <!-- Matches the loaded form's background -->
    <div
      v-if="!consented"
      class="flex w-full flex-col items-center justify-center gap-4 bg-zeffy-light p-6 text-black"
    >
      <label class="flex max-w-lg cursor-pointer items-start gap-3 text-sm md:text-base">
        <input
          v-model="consented"
          type="checkbox"
          class="mt-1 size-4 shrink-0 cursor-pointer accent-zeffy"
        >
        <span>{{ label }}</span>
      </label>
    </div>

    <iframe
      v-else-if="useFallback"
      title="Spendenformular von Zeffy"
      :src="`https://www.zeffy.com${props.formUrl}`"
      class="h-112.5 w-full border-0"
      allowpaymentrequest
      allowtransparency="true"
    />

    <!-- Override the inline max-width/centering set by the embed script -->
    <div
      v-else
      class="mx-0! max-w-none!"
      data-zeffy-embed
      :data-form-url="props.formUrl"
    />
  </div>
</template>

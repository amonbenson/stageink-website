<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  // Path of the donation form on zeffy.com, e.g. "/embed/donation-form/<slug>"
  formUrl: {
    type: String,
    required: true,
  },
});

const embedScriptSrc = "https://www.zeffy.com/embed/v2/zeffy-embed.js";

// If the embed script fails to load (e.g. blocked), fall back to a plain iframe.
const useFallback = ref(false);
let embedScript = null;

// Vue templates can't contain <script> tags, so the embed script is injected
// once the placeholder element is in the DOM (client-side only, SSG-safe).
onMounted(() => {
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
    <iframe
      v-if="useFallback"
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

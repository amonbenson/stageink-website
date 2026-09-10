import { computed, shallowRef } from "vue";

// Shared state for the full-screen backdrop rendered by BackdropMedia.
//
// Elements register themselves through the `v-backdrop` directive:
//   v-backdrop="image"                     scroll trigger, shorthand for { src: image }
//   v-backdrop="{ src, origin, opacity, color }"  scroll trigger with options
//   v-backdrop.hover="image"               hover trigger, overrides the scroll selection
//
// `src` is a `?lqip` bundle ({ url, lqip, width, height }), `origin` is one of
// "center" | "left" | "right", `opacity` (0..1) dims the backdrop and `color`
// is the CSS color it is dimmed with.

const DEFAULTS = { src: null, origin: "center", opacity: 1, color: "black" };

// Plain registries: element -> options. Never iterated reactively.
const scrollTriggers = new Map();
const hoverTriggers = new Map();

// Options of the currently selected triggers. The hover selection wins.
const scrollBackdrop = shallowRef(null);
const hoverBackdrop = shallowRef(null);

let scrollElement = null;
let hoverElement = null;
let rafId = null;

/**
 * Reactive backdrop that is currently selected.
 * @returns {import("vue").ComputedRef<{ src: object|null, origin: string, opacity: number, color: string }>}
 */
export function useBackdrop() {
  return computed(() => hoverBackdrop.value ?? scrollBackdrop.value ?? DEFAULTS);
}

function normalize(value) {
  if (!value) {
    return { ...DEFAULTS };
  }

  // Shorthand: the value is a `?lqip` bundle instead of an options object.
  return value.url ? { ...DEFAULTS, src: value } : { ...DEFAULTS, ...value };
}

function selectScrollTrigger() {
  rafId = null;

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  let bestElement = null;
  let bestVisibleHeight = 0;

  for (const element of scrollTriggers.keys()) {
    const rect = element.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

    if (visibleHeight > bestVisibleHeight) {
      bestVisibleHeight = visibleHeight;
      bestElement = element;
    }
  }

  // Keep the current backdrop while no trigger is on screen, so gaps between
  // triggers don't fade the backdrop out.
  if (bestElement && bestElement !== scrollElement) {
    scrollElement = bestElement;
    scrollBackdrop.value = scrollTriggers.get(bestElement);
  }
}

function scheduleSelect() {
  if (rafId === null) {
    rafId = requestAnimationFrame(selectScrollTrigger);
  }
}

function setListenersEnabled(enabled) {
  if (enabled) {
    document.addEventListener("scroll", scheduleSelect, { passive: true });
    window.addEventListener("resize", scheduleSelect);
  } else {
    document.removeEventListener("scroll", scheduleSelect);
    window.removeEventListener("resize", scheduleSelect);
  }
}

function handleHoverIn(event) {
  hoverElement = event.currentTarget;
  hoverBackdrop.value = hoverTriggers.get(hoverElement);
}

function handleHoverOut(event) {
  if (hoverElement !== event.currentTarget) {
    return;
  }

  hoverElement = null;
  hoverBackdrop.value = null;
}

const HOVER_EVENTS = {
  pointerenter: handleHoverIn,
  pointerleave: handleHoverOut,
  focusin: handleHoverIn,
  focusout: handleHoverOut,
};

function setHoverListenersEnabled(element, enabled) {
  for (const [event, handler] of Object.entries(HOVER_EVENTS)) {
    if (enabled) {
      element.addEventListener(event, handler);
    } else {
      element.removeEventListener(event, handler);
    }
  }
}

function register(element, options, hover) {
  if (hover) {
    hoverTriggers.set(element, options);
    setHoverListenersEnabled(element, true);
    return;
  }

  if (scrollTriggers.size === 0) {
    setListenersEnabled(true);
  }

  scrollTriggers.set(element, options);
  scheduleSelect();
}

function update(element, options, hover) {
  const triggers = hover ? hoverTriggers : scrollTriggers;
  if (!triggers.has(element)) {
    return;
  }

  triggers.set(element, options);

  if (hover && hoverElement === element) {
    hoverBackdrop.value = options;
  } else if (!hover && scrollElement === element) {
    scrollBackdrop.value = options;
  }
}

function unregister(element) {
  if (hoverTriggers.delete(element)) {
    setHoverListenersEnabled(element, false);

    if (hoverElement === element) {
      hoverElement = null;
      hoverBackdrop.value = null;
    }
  }

  if (scrollTriggers.delete(element)) {
    if (scrollElement === element) {
      scrollElement = null;
      scrollBackdrop.value = null;
    }

    if (scrollTriggers.size === 0) {
      setListenersEnabled(false);
    } else {
      scheduleSelect();
    }
  }
}

export const vBackdrop = {
  mounted(element, binding) {
    register(element, normalize(binding.value), Boolean(binding.modifiers.hover));
  },
  updated(element, binding) {
    update(element, normalize(binding.value), Boolean(binding.modifiers.hover));
  },
  unmounted(element) {
    unregister(element);
  },
};

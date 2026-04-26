import { gsap } from "gsap";
import { onBeforeUnmount, onMounted } from "vue";

/**
 * Drives a GSAP timeline via scroll progress.
 * @param {(timeline: gsap.core.Timeline) => void} setup - Called each time the
 *   timeline is (re)built. Use it to add tweens to the provided timeline.
 */
export function useScrollTimeline(setup) {
  let timeline = null;
  let rafId = null;

  function update() {
    rafId = null;
    if (!timeline) {
      return;
    }

    const scrollable = document.body.offsetHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
    timeline.progress(progress);
  }

  function handleScroll() {
    if (rafId === null) {
      rafId = requestAnimationFrame(update);
    }
  }

  function init() {
    if (timeline) {
      timeline.kill();
      timeline = null;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    timeline = gsap.timeline({ paused: true });
    setup(timeline);
    update();
  }

  onMounted(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", init);
    init();
  });

  onBeforeUnmount(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }

    timeline?.kill();
    document.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", init);
  });
}

import { gsap } from "gsap";
import { onBeforeUnmount, onMounted } from "vue";

/**
 * Drives a GSAP timeline via scroll progress.
 * @param {(timeline: gsap.core.Timeline) => void} setup - Called each time the
 *   timeline is (re)built. Use it to add tweens to the provided timeline.
 * @param {() => boolean} [enabled] - Optional guard evaluated on each (re)init.
 *   Return false to skip building the timeline (e.g. on mobile). Reduced-motion
 *   preference is always checked regardless of this guard.
 */
export function useScrollTimeline(setup) {
  let timeline = null;

  function handleScroll() {
    if (!timeline) {
      return;
    }

    const progress = Math.min(1, window.scrollY / (document.body.offsetHeight - window.innerHeight));
    timeline.progress(progress);
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
    handleScroll();
  }

  onMounted(() => {
    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", init);
    init();
  });

  onBeforeUnmount(() => {
    timeline.kill();
    document.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", init);
  });
}

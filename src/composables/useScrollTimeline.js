import { gsap } from "gsap";
import { onBeforeUnmount, onMounted } from "vue";

/**
 * Drives a GSAP timeline via scroll progress.
 * @param {(timeline: gsap.core.Timeline) => void} setup - Called each time the
 *   timeline is (re)built. Use it to add tweens to the provided timeline.
 */
export function useScrollTimeline(setup) {
  let timeline = null;

  function handleScroll() {
    const progress = Math.min(1, window.scrollY / (document.body.offsetHeight - window.innerHeight));
    timeline.progress(progress);
  }

  function init() {
    if (timeline) {
      timeline.kill();
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

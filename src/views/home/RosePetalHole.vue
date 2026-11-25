<script setup>
import { onMounted, onUnmounted, useTemplateRef } from "vue";

// Background of NextShowCard: white rose petals spiral down into a hole in the
// middle. Petals the visitor touches with the cursor or a finger turn red
// ("painting the roses red") until they disappear in the hole. The parent
// forwards its pointer events to paint(), so the content on top stays usable.

// Positions are polar around the hole; radius 1 reaches the canvas corners
const RESPAWN_RADIUS = 1.05;
const VANISH_RADIUS = 0.03;
const SPIRAL_TURN_SPEED = 0.12;
const PETALS_PER_PIXEL = 1 / 14000;
const BRUSH_RADIUS = 60;
const PAINT_SPEED = 5;

const canvas = useTemplateRef("canvas");
const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let context = null;
let width = 0;
let height = 0;
let colors = {};
let petals = [];
let spiralAngle = 0;
let frame = null;
let lastTime = null;
let visible = false;
let resizeObserver = null;
let intersectionObserver = null;

const random = (min, max) => min + Math.random() * (max - min);
const smoothstep = (edge0, edge1, x) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

function createPetal(radius) {
  return {
    radius,
    angle: random(0, Math.PI * 2),
    size: random(54, 96),
    rotation: random(0, Math.PI * 2),
    spin: random(-1.5, 1.5),
    flip: random(0, Math.PI * 2),
    flipSpeed: random(0.8, 2.2),
    redness: 0,
    painted: false,
  };
}

function petalPosition(petal) {
  const reach = Math.hypot(width, height) / 2;
  return {
    x: width / 2 + Math.cos(petal.angle) * petal.radius * reach,
    y: height / 2 + Math.sin(petal.angle) * petal.radius * reach,
  };
}

function readColors() {
  const style = getComputedStyle(canvas.value);
  colors = {
    petal: style.getPropertyValue("--color-abh-petal"),
    paint: style.getPropertyValue("--color-primary"),
    spiral: style.getPropertyValue("--color-abh-hole"),
  };
}

function resize() {
  const rect = canvas.value.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  width = rect.width;
  height = rect.height;
  canvas.value.width = Math.round(width * ratio);
  canvas.value.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  // Spread fresh petals over the whole area, denser towards the hole
  const count = Math.round(Math.min(35, Math.max(10, width * height * PETALS_PER_PIXEL)));
  while (petals.length < count) {
    petals.push(createPetal(Math.sqrt(Math.random()) * RESPAWN_RADIUS));
  }

  petals.length = count;
  draw();
}

function update(dt) {
  spiralAngle += SPIRAL_TURN_SPEED * dt;

  for (const petal of petals) {
    // Faster and steeper the closer a petal gets to the hole
    petal.angle += (0.25 / (petal.radius + 0.15)) * dt;
    petal.radius -= (0.03 + 0.05 * (1 - petal.radius)) * dt;
    petal.rotation += petal.spin * dt;
    petal.flip += petal.flipSpeed * dt;
    if (petal.painted) {
      petal.redness = Math.min(1, petal.redness + PAINT_SPEED * dt);
    }

    if (petal.radius < VANISH_RADIUS) {
      Object.assign(petal, createPetal(RESPAWN_RADIUS + random(0, 0.1)));
    }
  }
}

// Two dark arms of a logarithmic spiral, wider towards the edge, like the
// hole on the poster. Each arm is one filled outline, since overlapping
// translucent strokes would show as beads.
function drawSpiral() {
  const reach = Math.hypot(width, height) / 2;
  const steps = 120;
  context.fillStyle = colors.spiral;
  context.globalAlpha = 0.35;

  for (const arm of [0, Math.PI]) {
    const inner = [];
    const outer = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const radius = 0.02 * Math.exp(t * 4) * reach;
      const halfWidth = 1 + t * 14;
      const angle = arm + spiralAngle - t * Math.PI * 4;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      inner.push([width / 2 + cos * (radius - halfWidth), height / 2 + sin * (radius - halfWidth)]);
      outer.push([width / 2 + cos * (radius + halfWidth), height / 2 + sin * (radius + halfWidth)]);
    }

    context.beginPath();
    [...inner, ...outer.reverse()].forEach(([x, y]) => context.lineTo(x, y));
    context.fill();
  }
}

// Rose petal: narrow base at the origin, broad rounded top with a small notch
function tracePetal(size) {
  context.beginPath();
  context.moveTo(0, size * 0.5);
  context.bezierCurveTo(-size * 0.7, size * 0.1, -size * 0.6, -size * 0.6, 0, -size * 0.4);
  context.bezierCurveTo(size * 0.6, -size * 0.6, size * 0.7, size * 0.1, 0, size * 0.5);
}

function drawPetal(petal) {
  const { x, y } = petalPosition(petal);
  // Petals shrink and fade as they sink into the hole, and are smaller on phones
  const depth = Math.min(1, petal.radius * 1.4) ** 0.8 * Math.min(1, Math.max(0.6, width / 700));
  const alpha = smoothstep(VANISH_RADIUS, 0.2, petal.radius);
  if (alpha <= 0) {
    return;
  }

  context.save();
  context.translate(x, y);
  context.rotate(petal.rotation);
  // Tumbling: a petal seen edge-on gets narrow
  context.scale(Math.max(0.25, Math.abs(Math.cos(petal.flip))), 1);
  tracePetal(petal.size * depth);

  context.globalAlpha = alpha * 0.9;
  context.fillStyle = colors.petal;
  context.fill();
  if (petal.redness > 0) {
    context.globalAlpha = alpha * petal.redness;
    context.fillStyle = colors.paint;
    context.fill();
  }

  context.restore();
}

function draw() {
  context.clearRect(0, 0, width, height);
  drawSpiral();
  petals.forEach(drawPetal);
  context.globalAlpha = 1;
}

function loop(time) {
  const dt = lastTime === null ? 0 : Math.min(0.1, (time - lastTime) / 1000);
  lastTime = time;
  update(dt);
  draw();
  frame = requestAnimationFrame(loop);
}

function setVisible(isVisible) {
  visible = isVisible;
  if (reducedMotion) {
    return;
  }

  if (visible && frame === null) {
    lastTime = null;
    frame = requestAnimationFrame(loop);
  } else if (!visible && frame !== null) {
    cancelAnimationFrame(frame);
    frame = null;
  }
}

function paint(event) {
  if (!context) {
    return;
  }

  const rect = canvas.value.getBoundingClientRect();
  const pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  for (const petal of petals) {
    const { x, y } = petalPosition(petal);
    if (Math.hypot(x - pointer.x, y - pointer.y) < BRUSH_RADIUS) {
      petal.painted = true;
      if (reducedMotion) {
        petal.redness = 1;
      }
    }
  }

  // Without the animation loop the change has to be drawn here
  if (reducedMotion) {
    draw();
  }
}

defineExpose({ paint });

onMounted(() => {
  context = canvas.value.getContext("2d");
  readColors();
  resize();

  resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas.value);
  intersectionObserver = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
  intersectionObserver.observe(canvas.value);
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  intersectionObserver?.disconnect();
  setVisible(false);
});
</script>

<template>
  <!-- The color classes only make Tailwind emit the tokens read in readColors() -->
  <canvas
    ref="canvas"
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 -z-10 size-full text-abh-petal"
  />
</template>

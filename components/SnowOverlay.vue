<template>
  <div class="snow-container">
    <div
      v-for="flake in flakes"
      :key="flake.id"
      class="snowflake"
      :class="flake.layer"
      :style="{
        '--left': flake.left,
        '--size': flake.size + 'px',
        '--delay': flake.delay,
        '--duration': flake.duration,
        '--opacity': flake.opacity,
        '--sway': flake.sway
      }"
    >
      <span class="flake">❄</span>
    </div>
  </div>
</template>

<script setup>
const COUNT = 80;
const flakes = Array.from({ length: COUNT }, (_, i) => {
  const size = Math.round(Math.random() * 18 + 8);
  return {
    id: i,
    left: (Math.random() * 100).toFixed(2) + '%',
    size,
    delay: (Math.random() * 8).toFixed(2) + 's',
    duration: (Math.random() * 8 + 6).toFixed(2) + 's',
    opacity: (Math.random() * 0.6 + 0.3).toFixed(2),
    sway: (Math.random() * 40 - 20).toFixed(2) + 'px',
    layer: Math.random() < 0.28 ? 'front' : Math.random() < 0.64 ? 'mid' : 'back'
  };
});
</script>

<style scoped>
.snow-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  background: radial-gradient(ellipse at center, rgba(255,255,255,0.02), transparent 40%);
}

.snowflake {
  position: absolute;
  left: var(--left);
  top: -12vh;
  font-size: var(--size);
  opacity: var(--opacity);
  color: #ffffff;
  will-change: transform;
  animation: fall var(--duration) linear infinite;
  animation-delay: var(--delay);
  display: inline-block;
  transform-origin: center;
  mix-blend-mode: screen;
}

.snowflake .flake {
  display: inline-block;
  filter: drop-shadow(0 0 6px rgba(255,255,255,0.25));
}

.snowflake::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc(var(--size) * 1.6);
  height: calc(var(--size) * 1.6);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.12), transparent 40%);
  filter: blur(6px);
  pointer-events: none;
}

.snowflake.back { font-size: calc(var(--size) * 0.7); opacity: calc(var(--opacity) * 0.7); }
.snowflake.mid { font-size: calc(var(--size) * 1); }
.snowflake.front { font-size: calc(var(--size) * 1.4); filter: drop-shadow(0 0 10px rgba(255,255,255,0.35)); }

@keyframes fall {
  0% { transform: translateY(-10vh) translateX(0) rotate(0deg); }
  100% { transform: translateY(110vh) translateX(var(--sway)) rotate(360deg); }
}
</style>

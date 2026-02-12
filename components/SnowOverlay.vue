<template>
  <div class="snow-container absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <div 
      v-for="n in 50" 
      :key="n"
      class="snowflake"
      :style="{
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        width: (Math.random() * 20 + 10) + 'px',
        height: (Math.random() * 20 + 10) + 'px',
        animationDelay: Math.random() * 5 + 's',
        animationDuration: (Math.random() * 5 + 5) + 's',
        opacity: Math.random() * 0.7 + 0.3
      }"
    >
      ❄️
    </div>
  </div>
</template>

<style scoped>
.snow-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.snowflake {
  position: absolute;
  color: white;
  font-size: 24px;
  animation: snowfall linear infinite;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
  transform: rotate(0deg);
}

@keyframes snowfall {
  0% {
    transform: translateY(-10vh) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
}
</style>
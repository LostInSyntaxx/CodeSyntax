<template>
  <div class="snow-container absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <svg 
      v-for="(flake, index) in snowflakes" 
      :key="index"
      class="snowflake absolute"
      :style="{
        left: flake.x + 'px',
        top: flake.y + 'px',
        width: flake.size * 2 + 'px',
        height: flake.size * 2 + 'px',
        opacity: flake.opacity,
        transform: `rotate(${flake.rotation}deg)`,
        transition: 'transform 0.1s linear'
      }"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L12 6M12 18L12 22M4 12H8M16 12H20M6 6L8 8M16 16L18 18M6 18L8 16M16 8L18 6"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="white" fill-opacity="0.8" />
      <path
        d="M12 6L13 9H11L12 6Z M12 18L13 15H11L12 18Z M6 12L9 11V13L6 12Z M18 12L15 11V13L18 12Z"
        fill="white"
        fill-opacity="0.6"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const snowflakes = ref([])
const animationFrameId = ref(null)


class Snowflake {
  constructor(containeWidth, containeHeight) {
    this.x = Math.random() * containeWidth
    this.y = Math.random() * containeHeight
    this.vx = Math.random() * 0.5 - 0.25
    this.vy = Math.random() * 0.3 + 0.4
    this.size = Math.random() * 12 + 8
    this.rotation = Math.random() * 360
    this.rotationSpeed = (Math.random() - 0.5) * 1.5
    this.opacity = Math.random() * 0.5 + 0.4  
  }

  update(containeWidth, containeHeight) {
    this.x += this.vx
    this.y += this.vy
    this.rotation += this.rotationSpeed

    if (this.y > containeHeight + this.size) {
      this.y = -this.size
      this.x = Math.random() * containeWidth
    }
    if (this.x > containeWidth + this.size) {
      this.x = -this.size
    }
    if (this.x < -this.size) {
      this.x = containeWidth + this.size
    }
  }
}

const updateSnowflakes = () => {
  const container = document.querySelector('.snow-container')
  if (!container) return

  const width = container.clientWidth
  const height = container.clientHeight

  snowflakes.value.forEach(flake => {
    flake.update(width, height)
  })

  animationFrameId.value = requestAnimationFrame(updateSnowflakes)
}


const initSnowflakes = () => {
  const container = document.querySelector('.snow-container')
  if (!container) return

  const width = container.clientWidth
  const height = container.clientHeight
  const count = 30

  snowflakes.value = []
  for (let i = 0; i < count; i++) {
    snowflakes.value.push(new Snowflake(width, height))
  }
}

const handleResize = () => {
  initSnowflakes()
}

onMounted(() => {
  initSnowflakes()
  updateSnowflakes()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }
})
</script>


<style scoped>  
.snow-container {
  pointer-events: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.snowflake  {
  position: absolute;
  will-change: transform, top, left ;
  animation: float 3s infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(var(--rotation, 0deg));
  }
  50% {
    transform: translateY(10px) rotate(var(--rotation, 45deg));
  }
}

</style>
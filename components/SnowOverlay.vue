<template>
  <canvas ref="canvas" class="absolute inset-0 z-0 pointer-events-none"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx = null
let animationFrameId = null

const particles = []
const particleCount = 100

class Particle {
  constructor(w, h) {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.vx = Math.random() * 1 - 0.5
    this.vy = Math.random() * 1 + 1
    this.size = Math.random() * 2 + 1
  }

  update(w, h) {
    this.x += this.vx
    this.y += this.vy

    if (this.y > h) {
      this.y = -10
      this.x = Math.random() * w
    }
    if (this.x > w) {
      this.x = -10
    }
    if (this.x < -10) {
      this.x = w
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.fill()
  }
}

const init = () => {
  if (!canvas.value) return
  const w = canvas.value.width = canvas.value.parentElement.clientWidth
  const h = canvas.value.height = canvas.value.parentElement.clientHeight
  
  particles.length = 0
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(w, h))
  }
}

const animate = () => {
  if (!canvas.value || !ctx) return
  const w = canvas.value.width
  const h = canvas.value.height
  
  ctx.clearRect(0, 0, w, h)
  
  particles.forEach(p => {
    p.update(w, h)
    p.draw(ctx)
  })
  
  animationFrameId = requestAnimationFrame(animate)
}

const handleResize = () => {
  init()
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    init()
    animate()
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationFrameId)
})
</script>

<script setup lang="ts">
import { ref } from 'vue'
import SnowOverlay from '../components/SnowOverlay.vue'
import PreloaderScreen from '../components/PreloaderScreen.vue'

const loading = ref(true)

function onPreloaderDone() {
  loading.value = false
}
</script>

<template>
  <!-- ===== PRELOADER ===== -->
  <Transition name="preloader">
    <PreloaderScreen v-if="loading" @done="onPreloaderDone" />
  </Transition>

  <!-- ===== MAIN SITE ===== -->
  <Transition name="main-enter">
    <div v-show="!loading" class="relative min-h-screen w-full overflow-hidden font-['Kanit'] text-white">
      <div class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style="background-image: url('/background.jpg');">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
      </div>

      <!-- Snow Effect -->
      <SnowOverlay />

      <!-- Main Content -->
      <div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">

        <!-- Profile Card/Section -->
        <div class="flex flex-col items-center gap-6 p-8">

          <!-- Avatar -->
          <div class="anim-avatar relative group">
            <div
              class="absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200 anim-glow-ring">
            </div>
            <img src="/two.png" alt="Profile"
              class="relative h-48 w-48 rounded-full border-4 border-white/30 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105" />
          </div>

          <!-- Name & Title -->
          <div class="space-y-4">
            <h1 class="anim-name text-3xl font-bold tracking-wide md:text-5xl drop-shadow-lg uppercase">
              LostIn Syntaxx
            </h1>
            <div class="flex justify-center">
              <span
                class="anim-badge relative rounded-full bg-yellow-500/20 px-4 py-1.5 text-sm font-semibold text-yellow-300 backdrop-blur-md border border-yellow-500/30">
                Backend Developer &nbsp;& Frontend Enthusiast
              </span>
            </div>
            <p class="anim-desc mt-4 text-gray-200 text-lg drop-shadow-md max-w-lg mx-auto">
              Yes, This is all I can do with Frontend stuff.
            </p>
          </div>

          <!-- Buttons -->
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a href="mailto:contact@example.com"
              class="anim-btn btn-hover flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-2.5 font-medium text-white shadow-lg shadow-emerald-500/20"
              style="--btn-glow-color: rgba(16, 185, 129, 0.4); --btn-i: 0">
              <Icon name="lucide:mail" class="h-5 w-5" />
              Contact Me
            </a>

            <a href="https://github.com/LostInSyntaxx" target="_blank"
              class="anim-btn btn-hover flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-2.5 font-medium text-white shadow-lg shadow-black/20"
              style="--btn-glow-color: rgba(0, 0, 0, 0.4); --btn-i: 1">
              <Icon name="mdi:github" class="h-5 w-5" />
              Github
            </a>

            <a href="https://discord.com/users/sqlalchemy1" target="_blank"
              class="anim-btn btn-hover flex items-center gap-2 rounded-lg bg-[#5865F2] px-6 py-2.5 font-medium text-white shadow-lg shadow-[#5865F2]/20"
              style="--btn-glow-color: rgba(88, 101, 242, 0.4); --btn-i: 2">
              <Icon name="mdi:discord" class="h-5 w-5" />
              Discord
            </a>

            <a href="https://www.instagram.com/marblefoxf/" target="_blank"
              class="anim-btn btn-hover flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2.5 font-medium text-white shadow-lg shadow-pink-500/20"
              style="--btn-glow-color: rgba(236, 72, 153, 0.4); --btn-i: 3">
              <Icon name="mdi:instagram" class="h-5 w-5" />
              Instagram
            </a>

            <a href="#"
              class="anim-btn btn-hover flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 font-medium text-gray-900 shadow-lg shadow-white/20"
              style="--btn-glow-color: rgba(255, 255, 255, 0.3); --btn-i: 4">
              <Icon name="lucide:file-text" class="h-5 w-5" />
              Résumé
            </a>
          </div>

        </div>
      </div>
      <footer class="anim-footer absolute bottom-4 w-full text-center text-sm text-white/70 z-10">
        <p>© {{ new Date().getFullYear() }} LostIn Syntaxx. All rights reserved.</p>
        <div class="mt-2">
          <a href="\" class="text-gray-400 hover:text-gray-200 transition-colors">Made with ❤️ by LostIn Syntaxx</a>
        </div>
      </footer>
    </div>
  </Transition>
</template>



<style>
/* ============================================================
   PAGE TRANSITIONS
   ============================================================ */

/* Preloader exit */
.preloader-leave-active {
  transition: opacity 0.8s ease, filter 0.8s ease;
}

.preloader-leave-to {
  opacity: 0;
  filter: blur(10px);
}

/* Main site entrance */
.main-enter-enter-active {
  transition: opacity 1s ease 0.3s, filter 1s ease 0.3s;
}

.main-enter-enter-from {
  opacity: 0;
  filter: blur(6px);
}

.main-enter-enter-to {
  opacity: 1;
  filter: blur(0);
}

/* ============================================================
   MAIN SITE ENTRANCE ANIMATIONS
   ============================================================ */

/* Base: hide elements before animation */
.anim-avatar,
.anim-name,
.anim-badge,
.anim-desc,
.anim-btn,
.anim-footer {
  opacity: 0;
  animation-fill-mode: both;
}

/* 1. Avatar — scale in + continuous glow pulse */
.anim-avatar {
  animation: scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.anim-glow-ring {
  animation: pulseGlow 3s ease-in-out infinite;
}

@keyframes pulseGlow {

  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

/* 2. Name — slide down + blur fade */
.anim-name {
  animation: slideFadeDown 0.7s ease-out 0.4s both;
}

@keyframes slideFadeDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
    filter: blur(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

/* 3. Badge — slide up + shimmer */
.anim-badge {
  animation: slideUp 0.6s ease-out 0.65s both;
  background-size: 200% 100%;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.anim-badge::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.12) 40%, rgba(255, 255, 255, 0.18) 50%, rgba(255, 255, 255, 0.12) 60%, transparent 80%);
  background-size: 250% 100%;
  animation: shimmer 3s ease-in-out 1.2s infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0% {
    background-position: 200% center;
  }

  100% {
    background-position: -200% center;
  }
}

/* 4. Description — blur to clear */
.anim-desc {
  animation: blurIn 0.6s ease-out 0.85s both;
}

@keyframes blurIn {
  from {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

/* 5. Buttons — staggered pop-in */
.anim-btn {
  animation: popIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: calc(1s + var(--btn-i) * 0.1s);
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.6) translateY(10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Button Hover */
.btn-hover {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.btn-hover:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px var(--btn-glow-color, rgba(0, 0, 0, 0.3));
}

.btn-hover:active {
  transform: translateY(-1px) scale(1.02);
  transition-duration: 0.1s;
}

/* 6. Footer — gentle rise */
.anim-footer {
  animation: fadeRise 0.6s ease-out 1.6s both;
}

@keyframes fadeRise {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 0.7;
    transform: translateY(0);
  }
}
</style>

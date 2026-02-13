<script setup lang="ts">
import SnowOverlay from '../components/SnowOverlay.vue'
</script>

<template>
  <div class="relative min-h-screen w-full overflow-hidden font-['Kanit'] text-white">
    <div class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/background.jpg');">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
    </div>

    <!-- Snow Effect -->
    <SnowOverlay />

    <!-- Main Content -->
    <div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">

      <!-- Profile Card/Section -->
      <div class="animate-fade-in-up flex flex-col items-center gap-6 p-8">

        <!-- Avatar -->
        <div class="relative group">
          <div
            class="absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200">
          </div>
          <img src="/two.png" alt="Profile"
            class="relative h-48 w-48 rounded-full border-4 border-white/30 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105" />
        </div>

        <!-- Name & Title -->
        <div class="space-y-4">
          <h1 class="text-3xl font-bold tracking-wide md:text-5xl drop-shadow-lg uppercase">
            LostIn Syntaxx
          </h1>
          <div class="flex justify-center">
            <span
              class="rounded-full bg-yellow-500/20 px-4 py-1.5 text-sm font-semibold text-yellow-300 backdrop-blur-md border border-yellow-500/30">
              Backend Developer &nbsp;& Frontend Enthusiast
            </span>
          </div>
          <p class="mt-4 text-gray-200 text-lg drop-shadow-md max-w-lg mx-auto">
            Yes, This is all I can do with Frontend stuff.
          </p>
        </div>

        <!-- Buttons -->
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <a href="mailto:contact@example.com"
            class="flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-2.5 font-medium text-white transition-all hover:bg-emerald-600 hover:scale-105 shadow-lg shadow-emerald-500/20">
            <Icon name="lucide:mail" class="h-5 w-5" />
            Contact Me
          </a>

          <a href="https://github.com/LostInSyntaxx" target="_blank"
            class="flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-2.5 font-medium text-white transition-all hover:bg-black hover:scale-105 shadow-lg shadow-black/20">
            <Icon name="mdi:github" class="h-5 w-5" />
            Github
          </a>

          <a href="https://discord.com/users/sqlalchemy1" target="_blank"
            class="flex items-center gap-2 rounded-lg bg-[#5865F2] px-6 py-2.5 font-medium text-white transition-all hover:bg-[#4752C4] hover:scale-105 shadow-lg shadow-[#5865F2]/20">
            <Icon name="mdi:discord" class="h-5 w-5" />
            Discord
          </a>

          <a href="https://www.instagram.com/marblefoxf/" target="_blank"
            class="flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2.5 font-medium text-white transition-all hover:opacity-90 hover:scale-105 shadow-lg shadow-pink-500/20">
            <Icon name="mdi:instagram" class="h-5 w-5" />
            Instagram
          </a>

          <a href="#"
            class="flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 font-medium text-gray-900 transition-all hover:bg-gray-100 hover:scale-105 shadow-lg shadow-white/20">
            <Icon name="lucide:file-text" class="h-5 w-5" />
            Résumé
          </a>
        </div>

      </div>
    </div>

    <footer class="absolute bottom-4 w-full text-center text-sm text-white/70 z-10">
      <p>© {{ new Date().getFullYear() }} LostIn Syntaxx. All rights reserved.</p>
    </footer>
  </div>
</template>



<style>
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<script setup lang="ts">
interface SpotifyData {
    isPlaying: boolean
    title?: string
    artist?: string
    album?: string
    albumArt?: string
    songUrl?: string
    progressMs?: number
    durationMs?: number
}

const spotify = ref<SpotifyData>({ isPlaying: false })
const progress = ref(0)
const hovered = ref(false)
let pollTimer: ReturnType<typeof setInterval> | null = null
let progressTimer: ReturnType<typeof setInterval> | null = null

async function fetchNowPlaying() {
    try {
        const data = await $fetch<SpotifyData>('/api/spotify')
        spotify.value = data
        if (data.isPlaying && data.progressMs && data.durationMs) {
            progress.value = (data.progressMs / data.durationMs) * 100
            startProgressTick(data.progressMs, data.durationMs)
        } else {
            progress.value = 0
            if (progressTimer) clearInterval(progressTimer)
        }
    } catch {
        spotify.value = { isPlaying: false }
    }
}

function startProgressTick(startMs: number, durationMs: number) {
    if (progressTimer) clearInterval(progressTimer)
    let currentMs = startMs
    progressTimer = setInterval(() => {
        currentMs += 1000
        if (currentMs >= durationMs) {
            currentMs = durationMs
            if (progressTimer) clearInterval(progressTimer)
            fetchNowPlaying()
        }
        progress.value = (currentMs / durationMs) * 100
    }, 1000)
}

function formatTime(ms?: number): string {
    if (!ms) return '0:00'
    const s = Math.floor(ms / 1000)
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
}

onMounted(() => {
    fetchNowPlaying()
    pollTimer = setInterval(fetchNowPlaying, 30000)
})

onUnmounted(() => {
    if (pollTimer) clearInterval(pollTimer)
    if (progressTimer) clearInterval(progressTimer)
})
</script>

<template>
    <div class="anim-spotify mx-auto mt-6 w-full max-w-sm">
        <!-- Now Playing Card -->
        <a v-if="spotify.isPlaying && spotify.title" :href="spotify.songUrl" target="_blank"
            @mouseenter="hovered = true" @mouseleave="hovered = false"
            class="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1e2b] to-[#151923] p-1 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20">

            <!-- Animated Border Gradient -->
            <div
                class="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30">
            </div>

            <!-- Main Content -->
            <div class="relative flex items-center gap-4 rounded-xl bg-[#1e2432] p-4 backdrop-blur-xl">

                <!-- Album Art with 3D Effect -->
                <div class="relative h-20 w-20 flex-shrink-0">
                    <!-- Album Image -->
                    <div
                        class="absolute inset-0 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-50">
                    </div>
                    <div
                        class="relative h-full w-full overflow-hidden rounded-xl shadow-2xl ring-2 ring-white/10 transition-all duration-500 group-hover:ring-green-400/50">
                        <img :src="spotify.albumArt" :alt="spotify.album"
                            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />

                        <!-- Hover Overlay -->
                        <div
                            class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/50">
                                <Icon name="mdi:play" class="h-5 w-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Song Info -->
                <div class="min-w-0 flex-1">
                    <!-- Now Playing Badge with Equalizer -->
                    <div class="mb-2 flex items-center gap-2">
                        <div class="spotify-bars flex items-end gap-[3px]">
                            <span class="bar" :class="{ 'animate-pulse': hovered }"></span>
                            <span class="bar" :class="{ 'animate-pulse': hovered }"
                                style="animation-delay: 0.2s"></span>
                            <span class="bar" :class="{ 'animate-pulse': hovered }"
                                style="animation-delay: 0.4s"></span>
                        </div>
                        <span class="text-xs font-medium tracking-wider text-green-400">NOW PLAYING</span>
                    </div>

                    <!-- Track Title -->
                    <p class="truncate text-lg font-bold text-white transition-colors group-hover:text-green-400">
                        {{ spotify.title }}
                    </p>

                    <!-- Artist Name with Link -->
                    <p class="truncate text-sm text-gray-400 transition-colors group-hover:text-gray-300">
                        {{ spotify.artist }}
                    </p>

                    <!-- Progress Section -->
                    <div class="mt-3 space-y-1.5">
                        <!-- Progress Bar with Tooltip -->
                        <div class="relative h-2 w-full overflow-hidden rounded-full bg-gray-700/50">
                            <div class="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-1000 ease-linear"
                                :style="{ width: progress + '%' }">
                                <!-- Shimmer Effect -->
                                <div
                                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer">
                                </div>
                            </div>
                        </div>

                        <!-- Time Indicators -->
                        <div class="flex items-center justify-between text-xs">
                            <span class="font-mono text-gray-400">{{ formatTime(spotify.progressMs) }}</span>
                            <span class="font-mono text-gray-500">{{ formatTime(spotify.durationMs) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Spotify Icon -->
                <div class="absolute right-4 top-4 opacity-30 transition-opacity group-hover:opacity-100">
                    <Icon name="mdi:spotify" class="h-5 w-5 text-green-400" />
                </div>
            </div>
        </a>

        <!-- Not Playing State - Redesigned -->
        <div v-else
            class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1e2b] to-[#151923] p-1 transition-all duration-500 hover:scale-[1.02]">
            <div class="relative flex items-center gap-4 rounded-xl bg-[#1e2432] p-6 backdrop-blur-xl">
                <!-- Spotify Logo -->
                <div
                    class="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 to-gray-800">
                    <Icon name="mdi:spotify" class="h-8 w-8 text-gray-400" />
                </div>

                <div>
                    <p class="text-lg font-semibold text-gray-300">Not Playing</p>
                    <p class="text-sm text-gray-500">Connect to Spotify to see what's playing</p>
                </div>

                <!-- Decorative Elements -->
                <div class="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 transform opacity-10">
                    <Icon name="mdi:music-note" class="h-full w-full text-green-500" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Enhanced Spotify equalizer animation */
.spotify-bars {
    height: 16px;
}

.bar {
    display: inline-block;
    width: 4px;
    background: linear-gradient(to top, #22c55e, #4ade80);
    border-radius: 4px;
    animation: barWave 1.2s ease-in-out infinite;
}

.bar:nth-child(1) {
    height: 8px;
    animation-delay: 0s;
}

.bar:nth-child(2) {
    height: 14px;
    animation-delay: 0.2s;
}

.bar:nth-child(3) {
    height: 6px;
    animation-delay: 0.4s;
}

@keyframes barWave {

    0%,
    100% {
        transform: scaleY(0.5);
        opacity: 0.7;
    }

    50% {
        transform: scaleY(1.2);
        opacity: 1;
    }
}

/* Shimmer animation for progress bar */
@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

.shimmer {
    animation: shimmer 2s infinite;
}

/* Pulse animation for bars on hover */
@keyframes softPulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.8;
    }
}

.animate-pulse {
    animation: softPulse 1.5s ease-in-out infinite;
}

/* Glass morphism effect */
.glass-effect {
    background: rgba(30, 36, 50, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Smooth transitions */
* {
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
}
</style>
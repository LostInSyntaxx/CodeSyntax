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
    <div class="anim-spotify mx-auto mt-8 w-full max-w-md">

        <!-- Now Playing Card -->
        <a v-if="spotify.isPlaying && spotify.title" :href="spotify.songUrl" target="_blank"
            class="spotify-card group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-white/[0.08] p-4 transition-all duration-500 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/5">
            <!-- Animated background glow -->
            <div
                class="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            </div>
            <div
                class="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-700 group-hover:bg-emerald-500/20">
            </div>

            <!-- Album Art with vinyl effect -->
            <div class="relative flex-shrink-0">
                <div class="vinyl-container relative h-16 w-16">
                    <!-- Vinyl disc behind album art -->
                    <div
                        class="vinyl-disc absolute -right-2 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg">
                        <div class="absolute inset-[6px] rounded-full border border-white/5"></div>
                        <div class="absolute inset-[10px] rounded-full border border-white/[0.03]"></div>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="h-2 w-2 rounded-full bg-gray-600"></div>
                        </div>
                    </div>
                    <!-- Album cover -->
                    <img :src="spotify.albumArt" :alt="spotify.album"
                        class="relative z-10 h-16 w-16 rounded-xl object-cover shadow-2xl ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105" />
                </div>
            </div>

            <!-- Song Info -->
            <div class="relative z-10 min-w-0 flex-1">
                <!-- Status badge -->
                <div class="mb-1.5 flex items-center gap-2">
                    <Icon name="mdi:spotify" class="h-4 w-4 text-[#1DB954]" />
                    <div class="spotify-bars flex items-end gap-[3px]">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                    <span class="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1DB954]">Now Playing</span>
                </div>

                <!-- Track name -->
                <p class="truncate text-sm font-bold text-white/95 transition-colors group-hover:text-white">
                    {{ spotify.title }}
                </p>

                <!-- Artist -->
                <p class="truncate text-xs text-white/40 mt-0.5">
                    {{ spotify.artist }}
                </p>

                <!-- Progress Bar -->
                <div class="mt-2.5 flex items-center gap-2">
                    <div class="h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <div class="progress-bar h-full rounded-full transition-all duration-1000 ease-linear"
                            :style="{ width: progress + '%' }"></div>
                    </div>
                </div>
            </div>
        </a>

        <!-- Not Listening State -->
        <div v-else
            class="flex items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 backdrop-blur-sm">
            <Icon name="mdi:spotify" class="h-5 w-5 text-white/20" />
            <span class="text-xs font-medium tracking-wide text-white/25">Not playing anything on Spotify</span>
        </div>
    </div>
</template>

<style scoped>
/* Card glass background */
.spotify-card {
    background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0.01) 100%);
    backdrop-filter: blur(20px);
}

/* Vinyl spin animation */
.vinyl-disc {
    animation: vinylSpin 3s linear infinite;
}

@keyframes vinylSpin {
    from {
        transform: translateY(-50%) rotate(0deg);
    }

    to {
        transform: translateY(-50%) rotate(360deg);
    }
}

/* Progress bar gradient */
.progress-bar {
    background: linear-gradient(90deg, #1DB954, #1ed760);
    box-shadow: 0 0 8px rgba(29, 185, 84, 0.4);
}

/* Equalizer bars */
.spotify-bars {
    height: 12px;
}

.bar {
    display: inline-block;
    width: 2.5px;
    background: #1DB954;
    border-radius: 2px;
    animation: barBounce 1s ease-in-out infinite;
}

.bar:nth-child(1) {
    height: 4px;
    animation-delay: 0s;
}

.bar:nth-child(2) {
    height: 8px;
    animation-delay: 0.15s;
}

.bar:nth-child(3) {
    height: 5px;
    animation-delay: 0.3s;
}

.bar:nth-child(4) {
    height: 10px;
    animation-delay: 0.45s;
}

@keyframes barBounce {

    0%,
    100% {
        transform: scaleY(0.3);
    }

    50% {
        transform: scaleY(1);
    }
}
</style>

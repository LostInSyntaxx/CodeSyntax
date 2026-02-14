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
            // Fetch new data since song probably changed
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
        <!-- Listening -->
        <a v-if="spotify.isPlaying && spotify.title" :href="spotify.songUrl" target="_blank"
            class="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg transition-all duration-300 hover:border-green-500/30 hover:bg-white/10">
            <!-- Album Art -->
            <div class="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl shadow-lg">
                <img :src="spotify.albumArt" :alt="spotify.album" class="h-full w-full object-cover" />
                <div
                    class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <Icon name="mdi:spotify" class="h-6 w-6 text-green-400" />
                </div>
            </div>

            <!-- Song Info -->
            <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 mb-0.5">
                    <div class="spotify-bars flex items-end gap-[2px]">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                    <span class="text-[10px] font-semibold uppercase tracking-wider text-green-400">Now Playing</span>
                </div>
                <p class="truncate text-sm font-semibold text-white">{{ spotify.title }}</p>
                <p class="truncate text-xs text-gray-400">{{ spotify.artist }}</p>

                <!-- Progress Bar -->
                <div class="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div class="h-full rounded-full bg-green-500 transition-all duration-1000 ease-linear"
                        :style="{ width: progress + '%' }"></div>
                </div>
            </div>
        </a>

        <!-- Not Listening -->
        <div v-else class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
            <Icon name="mdi:spotify" class="h-6 w-6 text-gray-500" />
            <span class="text-sm text-gray-500">Not listening to Spotify</span>
        </div>
    </div>
</template>

<style scoped>
/* Spotify equalizer animation */
.spotify-bars {
    height: 12px;
}

.bar {
    display: inline-block;
    width: 3px;
    background: #1db954;
    border-radius: 2px;
    animation: barBounce 1.2s ease-in-out infinite;
}

.bar:nth-child(1) {
    height: 6px;
    animation-delay: 0s;
}

.bar:nth-child(2) {
    height: 10px;
    animation-delay: 0.2s;
}

.bar:nth-child(3) {
    height: 4px;
    animation-delay: 0.4s;
}

@keyframes barBounce {

    0%,
    100% {
        transform: scaleY(0.4);
    }

    50% {
        transform: scaleY(1);
    }
}
</style>

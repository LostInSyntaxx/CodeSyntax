<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits<{
    (e: 'done'): void
}>()

const fadeOut = ref(false)

onMounted(() => {
    setTimeout(() => {
        fadeOut.value = true
        setTimeout(() => {
            emit('done')
        }, 800)
    }, 2500)
})
</script>

<template>
    <div :class="['preloader', { 'preloader--fade-out': fadeOut }]">
        <!-- Animated background particles -->
        <div class="preloader__particles">
            <div v-for="n in 20" :key="n" class="preloader__particle" :style="{
                '--p-x': Math.random() * 100 + '%',
                '--p-y': Math.random() * 100 + '%',
                '--p-size': (Math.random() * 4 + 2) + 'px',
                '--p-delay': (Math.random() * 3) + 's',
                '--p-duration': (Math.random() * 3 + 2) + 's',
            }" />
        </div>

        <!-- Center content -->
        <div class="preloader__content">
            <!-- Spinning ring -->
            <div class="preloader__ring">
                <svg viewBox="0 0 120 120" class="preloader__svg">
                    <circle class="preloader__circle-bg" cx="60" cy="60" r="54" />
                    <circle class="preloader__circle-progress" cx="60" cy="60" r="54" />
                </svg>
                <!-- Avatar inside ring -->
                <img src="/two.png" alt="Loading" class="preloader__avatar" />
            </div>

            <!-- Name -->
            <h2 class="preloader__title">
                <span class="preloader__title-text">LostIn Syntaxx</span>
            </h2>

            <!-- Loading dots -->
            <div class="preloader__dots">
                <span class="preloader__dot" style="--dot-i: 0" />
                <span class="preloader__dot" style="--dot-i: 1" />
                <span class="preloader__dot" style="--dot-i: 2" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.preloader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(ellipse at center, #1a1033 0%, #0a0a14 70%, #000000 100%);
    transition: opacity 0.8s ease, filter 0.8s ease, transform 0.8s ease;
    overflow: hidden;
}

.preloader--fade-out {
    opacity: 0;
    filter: blur(10px);
    transform: scale(1.05);
}

/* --- Floating particles --- */
.preloader__particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.preloader__particle {
    position: absolute;
    left: var(--p-x);
    top: var(--p-y);
    width: var(--p-size);
    height: var(--p-size);
    border-radius: 50%;
    background: rgba(168, 85, 247, 0.5);
    box-shadow: 0 0 8px rgba(168, 85, 247, 0.4);
    animation: particleFloat var(--p-duration) ease-in-out var(--p-delay) infinite alternate;
}

@keyframes particleFloat {
    0% {
        transform: translateY(0) scale(1);
        opacity: 0.3;
    }

    100% {
        transform: translateY(-30px) scale(1.5);
        opacity: 0.8;
    }
}

/* --- Center content --- */
.preloader__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    animation: contentPulse 2s ease-in-out infinite alternate;
}

@keyframes contentPulse {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.02);
    }
}

/* --- Spinning ring with avatar --- */
.preloader__ring {
    position: relative;
    width: 140px;
    height: 140px;
    animation: ringEntry 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes ringEntry {
    from {
        opacity: 0;
        transform: scale(0.3) rotate(-90deg);
    }

    to {
        opacity: 1;
        transform: scale(1) rotate(0);
    }
}

.preloader__svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    animation: ringSpin 2.5s linear infinite;
}

@keyframes ringSpin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.preloader__circle-bg {
    fill: none;
    stroke: rgba(168, 85, 247, 0.15);
    stroke-width: 4;
}

.preloader__circle-progress {
    fill: none;
    stroke: rgba(168, 85, 247, 1);
    stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: 339.292;
    stroke-dashoffset: 200;
    animation: progressDash 2s ease-in-out infinite;
}

@keyframes progressDash {
    0% {
        stroke-dashoffset: 300;
    }

    50% {
        stroke-dashoffset: 100;
    }

    100% {
        stroke-dashoffset: 300;
    }
}

.preloader__avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(168, 85, 247, 0.4);
    box-shadow: 0 0 25px rgba(168, 85, 247, 0.3);
    animation: avatarGlow 2s ease-in-out infinite alternate;
}

@keyframes avatarGlow {
    0% {
        box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
        border-color: rgba(168, 85, 247, 0.4);
    }

    100% {
        box-shadow: 0 0 35px rgba(236, 72, 153, 0.5);
        border-color: rgba(236, 72, 153, 0.6);
    }
}

/* --- Title --- */
.preloader__title {
    font-family: 'Kanit', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: white;
    animation: titleReveal 0.8s ease-out 0.3s both;
}

.preloader__title-text {
    background: linear-gradient(135deg, #ec4899, #a855f7, #6366f1);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: gradientShift 3s ease-in-out infinite;
}

@keyframes titleReveal {
    from {
        opacity: 0;
        transform: translateY(15px);
        filter: blur(8px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
    }
}

@keyframes gradientShift {

    0%,
    100% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }
}

/* --- Loading dots --- */
.preloader__dots {
    display: flex;
    gap: 8px;
    animation: dotsEntry 0.5s ease-out 0.6s both;
}

@keyframes dotsEntry {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.preloader__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(168, 85, 247, 0.8);
    animation: dotBounce 1.2s ease-in-out infinite;
    animation-delay: calc(var(--dot-i) * 0.15s);
}

@keyframes dotBounce {

    0%,
    80%,
    100% {
        transform: scale(0.6);
        opacity: 0.4;
    }

    40% {
        transform: scale(1.2);
        opacity: 1;
        background: #ec4899;
        box-shadow: 0 0 12px rgba(236, 72, 153, 0.6);
    }
}

/* --- Loading text --- */
.preloader__text {
    font-family: 'Kanit', sans-serif;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    animation: textPulse 2s ease-in-out infinite, textEntry 0.5s ease-out 0.8s both;
}

@keyframes textPulse {

    0%,
    100% {
        opacity: 0.45;
    }

    50% {
        opacity: 0.8;
    }
}

@keyframes textEntry {
    from {
        opacity: 0;
        transform: translateY(8px);
    }

    to {
        opacity: 0.45;
        transform: translateY(0);
    }
}
</style>

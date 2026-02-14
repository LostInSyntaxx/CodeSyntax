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
        <!-- Geometric grid background -->
        <div class="preloader__grid">
            <div class="preloader__grid-lines"></div>
        </div>

        <!-- Floating orbs -->
        <div class="preloader__orbs">
            <div v-for="n in 6" :key="n" class="preloader__orb" :style="{
                '--orb-x': Math.random() * 100 + '%',
                '--orb-y': Math.random() * 100 + '%',
                '--orb-delay': (Math.random() * 5) + 's',
                '--orb-size': (Math.random() * 300 + 200) + 'px',
            }" />
        </div>

        <!-- Main content -->
        <div class="preloader__content">
            <!-- Animated logo container -->
            <div class="preloader__logo-wrapper">
                <div class="preloader__logo-ring">
                    <div class="preloader__logo-ring-inner"></div>
                </div>
                
                <!-- Avatar with clean border -->
                <div class="preloader__avatar-container">
                    <img src="/two.png" alt="Loading" class="preloader__avatar" />
                    <div class="preloader__avatar-glow"></div>
                </div>

                <!-- Progress indicator -->
                <svg class="preloader__progress" viewBox="0 0 120 120">
                    <circle class="preloader__progress-bg" cx="60" cy="60" r="54" />
                    <circle class="preloader__progress-fill" cx="60" cy="60" r="54" />
                </svg>
            </div>

            <!-- Brand section -->
            <div class="preloader__brand">
                <h1 class="preloader__name">
                    <span class="preloader__name-first">LostIn</span>
                    <span class="preloader__name-last">Syntaxx</span>
                </h1>
                
                <!-- Status bar -->
                <div class="preloader__status">
                    <div class="preloader__status-bar">
                        <div class="preloader__status-fill"></div>
                    </div>
                    <div class="preloader__status-text">
                        <span>Initializing</span>
                        <div class="preloader__status-dots">
                            <span class="preloader__status-dot" v-for="n in 3" :key="n"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom hint -->
        <div class="preloader__hint">
            <span class="preloader__hint-text">Experience awaits</span>
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
    background: #1a1a1a;
    transition: opacity 0.8s ease, filter 0.8s ease, transform 0.8s ease;
    overflow: hidden;
}

.preloader--fade-out {
    opacity: 0;
    filter: blur(8px);
    transform: scale(0.98);
}

/* Geometric grid background */
.preloader__grid {
    position: absolute;
    inset: 0;
    opacity: 0.15;
}

.preloader__grid-lines {
    position: absolute;
    inset: 0;
    background-image: 
        linear-gradient(#242424 1px, transparent 1px),
        linear-gradient(90deg, #242424 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridFloat 20s linear infinite;
}

@keyframes gridFloat {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(50px, 50px);
    }
}

/* Floating orbs */
.preloader__orbs {
    position: absolute;
    inset: 0;
    filter: blur(80px);
    opacity: 0.4;
}

.preloader__orb {
    position: absolute;
    left: var(--orb-x);
    top: var(--orb-y);
    width: var(--orb-size);
    height: var(--orb-size);
    background: #242424;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: orbFloat var(--orb-delay) ease-in-out infinite alternate;
}

@keyframes orbFloat {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.3;
    }
    100% {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 0.6;
    }
}

/* Main content */
.preloader__content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
}

/* Logo wrapper */
.preloader__logo-wrapper {
    position: relative;
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: logoEntry 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes logoEntry {
    0% {
        opacity: 0;
        transform: scale(0.5) rotate(-10deg);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(0);
    }
}

/* Outer ring */
.preloader__logo-ring {
    position: absolute;
    inset: 0;
    border: 2px solid #242424;
    border-radius: 50%;
    animation: ringPulse 3s ease-in-out infinite;
}

.preloader__logo-ring-inner {
    position: absolute;
    inset: 8px;
    border: 1px solid #242424;
    border-radius: 50%;
    border-top-color: transparent;
    animation: ringSpin 3s linear infinite;
}

@keyframes ringPulse {
    0%, 100% {
        transform: scale(1);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.8;
    }
}

@keyframes ringSpin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

/* Avatar container */
.preloader__avatar-container {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
}

.preloader__avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 2;
}

.preloader__avatar-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 30%, #242424, transparent 70%);
    opacity: 0.4;
    z-index: 3;
}

/* Progress ring */
.preloader__progress {
    position: absolute;
    inset: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    transform: rotate(-90deg);
}

.preloader__progress-bg {
    fill: none;
    stroke: #242424;
    stroke-width: 2;
    opacity: 0.3;
}

.preloader__progress-fill {
    fill: none;
    stroke: #404040;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 339.292;
    stroke-dashoffset: 280;
    animation: progressFill 2.5s ease-in-out infinite;
}

@keyframes progressFill {
    0% {
        stroke-dashoffset: 339.292;
        stroke: #404040;
    }
    50% {
        stroke-dashoffset: 100;
        stroke: #4a4a4a;
    }
    100% {
        stroke-dashoffset: 339.292;
        stroke: #404040;
    }
}

/* Brand section */
.preloader__brand {
    text-align: center;
    animation: brandEntry 0.6s ease-out 0.3s both;
}

@keyframes brandEntry {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.preloader__name {
    margin-bottom: 24px;
}

.preloader__name-first {
    display: block;
    font-family: 'Kanit', sans-serif;
    font-size: 1.2rem;
    font-weight: 300;
    letter-spacing: 0.3em;
    color: #888;
    text-transform: uppercase;
    margin-bottom: 4px;
}

.preloader__name-last {
    display: block;
    font-family: 'Kanit', sans-serif;
    font-size: 2.2rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: #fff;
    text-transform: uppercase;
    text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

/* Status bar */
.preloader__status {
    width: 240px;
}

.preloader__status-bar {
    width: 100%;
    height: 2px;
    background: #242424;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 12px;
}

.preloader__status-fill {
    height: 100%;
    width: 60%;
    background: #404040;
    border-radius: 4px;
    animation: statusFill 1.5s ease-in-out infinite;
}

@keyframes statusFill {
    0% {
        width: 0%;
        opacity: 0.5;
    }
    50% {
        width: 80%;
        opacity: 1;
    }
    100% {
        width: 0%;
        opacity: 0.5;
    }
}

.preloader__status-text {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'Kanit', sans-serif;
    font-size: 0.9rem;
    color: #888;
    letter-spacing: 0.1em;
}

.preloader__status-dots {
    display: flex;
    gap: 4px;
}

.preloader__status-dot {
    width: 4px;
    height: 4px;
    background: #888;
    border-radius: 50%;
    animation: statusDot 1.4s ease-in-out infinite;
}

.preloader__status-dot:nth-child(2) {
    animation-delay: 0.2s;
}

.preloader__status-dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes statusDot {
    0%, 60%, 100% {
        transform: scale(1);
        opacity: 0.3;
    }
    30% {
        transform: scale(1.5);
        opacity: 1;
        background: #fff;
    }
}

/* Bottom hint */
.preloader__hint {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    animation: hintFade 2s ease-in-out infinite;
}

.preloader__hint-text {
    font-family: 'Kanit', sans-serif;
    font-size: 0.8rem;
    color: #505050;
    letter-spacing: 0.2em;
    text-transform: uppercase;
}

@keyframes hintFade {
    0%, 100% {
        opacity: 0.3;
        transform: translateX(-50%) translateY(0);
    }
    50% {
        opacity: 0.8;
        transform: translateX(-50%) translateY(-5px);
    }
}
</style>
<script lang="ts" setup>
import { ref } from 'vue';
import ButtonVue from './Button.vue';
import store from '/src/gameStore';

const starting = ref(false);

const startGame = async () => {
  starting.value = true;
  store.backgroundAudio.play();
  store.backgroundAudio.volume = 0.15;
  setTimeout(async () => {
    store.isGameStarted = true;
  }, 1500);
};
</script>

<template>
  <div class="d-flex align-items-center justify-content-center start-main">
    <div :class="['position-relative start-wrapper', { onstart: starting }]">
      <ButtonVue @click="startGame">BAŞLA</ButtonVue>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.start-main {
  width: 100vw;
  height: 100vh;
  .start-wrapper {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.onstart {
      animation: onstart 1.5s ease forwards;
    }

    &:not(.onstart):hover .start-text {
      animation: shaking 0.2s linear infinite;
    }

    &:not(.onstart):hover .circle {
      animation-play-state: paused;
    }
  }
}
</style>

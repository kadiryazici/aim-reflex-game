<script lang="ts" setup>
import ProgressVue from './Progress.vue';
import ShootAreaVue from './ShootArea.vue';
import store, { gameUpdate, createTarget } from '/src/gameStore';
import { onMounted, ref, watch } from 'vue';
import ButtonVue from './Button.vue';

const emit = defineEmits<{
  (e: 'targetClick'): void;
}>();

const gameMain = ref<HTMLDivElement>();
onMounted(() => {
  // 500 milisaniye bekleme nedenim en baştaki 500 milisaniyelik animasyon.
  setTimeout(() => {
    gameUpdate();
  }, 500);
});

watch(
  () => store.score,
  (val) => {
    let animation = '';

    if (val > 170) {
      animation = '.15s shaking linear infinite';
    } else if (val > 130) {
      animation = '.33s shaking linear infinite';
    } else if (val > 100) {
      animation = '.5s shaking linear infinite';
    } else if (val > 70) {
      animation = '0.75s shaking linear infinite';
    } else if (val > 40) {
      animation = '1s shaking linear infinite';
    }

    gameMain.value?.style.setProperty('animation', animation);
  },
);

function handleRestartClick() {
  store.isLost = false;
  store.score = 0;
  store.decreaseSpeed = 5;
  store.progress = 100;
  gameUpdate();
  createTarget();
  gameMain.value?.style.setProperty('animation', 'none');
}
</script>

<template>
  <div
    class="game-wrapper d-flex h-100 mx-auto w-100 p-3 align-items-center flex-wrap"
    ref="gameMain"
  >
    <div class="mx-auto w-100">
      <ProgressVue />
    </div>
    <ShootAreaVue @targetClick="emit('targetClick')" />
    <div
      style="flex: 1; height: fit-content"
      class="d-block w-100 right-area p-4"
    >
      <h1 :style="{ color: 'white', fontSize: '50px', textAlign: 'center' }">SCORE: {{ store.score }}</h1>
      <h3
        class="pb-2"
        style="color: white; text-align: center"
      >
        DJ Electrohead - Hit The Floor
      </h3>
      <div>
        <ButtonVue
          @click="handleRestartClick"
          v-if="store.isLost"
          class="mx-auto"
          >AGAIN</ButtonVue
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-wrapper {
  max-width: 1150px;
  max-height: 950px;
}
</style>

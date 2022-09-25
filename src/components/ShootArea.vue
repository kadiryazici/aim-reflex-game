<script lang="ts" setup>
import SlashVue from './Slash.vue';
import store, { playRandomHit, createTarget, createParticle } from '/src/gameStore';
import { onMounted } from 'vue';

const emit = defineEmits<{
  (e: 'targetClick'): void;
}>();

onMounted(createTarget);

function handleClick() {
  if (!store.target) return;

  store.slash = { ...store.target };

  playRandomHit();
  createParticle({ ...store.target });
  emit('targetClick');

  store.score++;
  store.progress = 100;
  store.target = null;

  setTimeout(createTarget);
}
</script>

<template>
  <div class="shoot-wrapper">
    <div
      v-if="store.target"
      @mousedown="handleClick"
      @touchstart="handleClick"
      :style="{
        left: store.target.x + '%',
        top: store.target.y + '%',
        width: '25px',
        height: '25px',
        backgroundColor: 'var(--purple)',
        boxShadow: '0px 0px 18px 1px var(--purple)',
        position: 'absolute',
      }"
      class="target"
    />

    <SlashVue
      v-if="store.slash"
      @done="() => (store.slash = null)"
      :style="{
        left: store.slash.x + '%',
        top: store.slash.y + '%',
        transform: `rotate(${Math.random() * (100 - -100) + -100}deg)`,
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
.shoot-wrapper {
  width: 500px;
  height: 500px;
  border: 4px solid var(--yellow);
  box-shadow: /*0px 0px 15px 1px */ var(/*--yellow*/ --box-shadow);
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}
@media screen and (max-width: 750px) {
  .shoot-wrapper {
    width: 275px;
    height: 275px;
    margin-top: 15px;
  }
}
</style>

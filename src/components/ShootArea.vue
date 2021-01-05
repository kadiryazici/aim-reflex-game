<template>
   <div class="wrapper">
      <div
         v-for="(value, index) in store.targets"
         @mousedown="
            () => {
               playRandomHit();
               store.score++;
               store.progress = 100;
               store.targets.splice(index, 1);
               createTarget();
               emit('targetClick');
               store.slashes.push(value);
               store.particles.push(value);
            }
         "
         @touchstart="
            () => {
               playRandomHit();
               store.score++;
               store.progress = 100;
               store.targets.splice(index, 1);
               createTarget();
               emit('targetClick');
               store.slashes.push(value);
               store.particles.push(value);
            }
         "
         :style="{
            left: value.x + '%',
            top: value.y + '%',
            width: '25px',
            height: '25px',
            backgroundColor: 'var(--purple)',
            boxShadow: '0px 0px 18px 1px var(--purple)',
            position: 'absolute',
         }"
         class="target"
      ></div>
      <SlashVue
         :style="{
            left: val.x + '%',
            top: val.y + '%',
            transform: `rotate(${Math.random() * (100 - -100) + -100}deg)`,
         }"
         :index="index"
         :key="index"
         v-for="(val, index) in store.slashes"
      />
      <ParticleVue
         :style="{
            left: val.x + '%',
            top: val.y + '%',
            transform: `rotate(${Math.random() * (180 - -180) + -180}deg)`,
         }"
         :index="index"
         :key="index"
         v-for="(val, index) in store.particles"
      />
   </div>
</template>

<script lang="ts" setup>
import { defineEmit } from 'vue';
import ParticleVue from './Particle.vue';
import SlashVue from './Slash.vue';
import store, { playRandomHit, createTarget } from '/src/gameStore';

const emit = defineEmit({
   targetClick: null,
});

createTarget();
const log = (e: MouseEvent) => console.log(e);
</script>

<style lang="scss" scoped>
.wrapper {
   width: 500px;
   height: 500px;
   border: 4px solid var(--yellow);
   box-shadow: /*0px 0px 15px 1px */ var(/*--yellow*/ --box-shadow);
   overflow: hidden;
   position: relative;
   margin: 0 auto;
}
@media screen and (max-width: 750px) {
   .wrapper {
      width: 275px;
      height: 275px;
      margin-top: 15px;
   }
}
</style>

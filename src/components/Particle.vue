<template>
   <div class="mr-5 particle">
      <div :class="{ active: isActive }"></div>
      <div :class="{ active: isActive }"></div>
      <div
         @transitionend="store.particles.shift()"
         :class="{ active: isActive }"
      ></div>
      <div :class="{ active: isActive }"></div>
   </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import store from '/src/gameStore';
const props = defineProps<{ index: number }>();
ref: isActive = false;
setTimeout(() => {
   isActive = true;
}, 25);
</script>

<style lang="scss" scoped>
.particle {
   width: 35px;
   height: 35px;
   display: inline-flex;
   flex-wrap: wrap;
   position: absolute;
   z-index: 400;
   flex-direction: row;
   pointer-events: none;
   transform: rotate(20deg);
   div {
      // pointer-events: none;
      width: 50% !important;
      box-shadow: 0px 0px 15px 1px var(--purple);
      height: 50% !important;
      background-color: var(--purple);
      transform: translate(0px) scale(0.5);
      opacity: 1;
      border-radius: 50%;
      transition: all 0.5s;
      position: relative;
      pointer-events: none;
   }

   div.active:nth-child(1) {
      transform: translate(-43px, -103px) scale(0.5);
      opacity: 0;
   }
   div.active:nth-child(2) {
      transform: translate(83px, -93px) scale(0.5);
      opacity: 0;
   }
   div.active:nth-child(3) {
      transform: translate(-42px, +68px) scale(0.5);
      opacity: 0;
   }
   div.active:nth-child(4) {
      transform: translate(33px, 75px) scale(0.5);
      opacity: 0;
   }
}
</style>

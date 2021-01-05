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

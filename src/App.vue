<template>
   <div
      class="appmain d-flex align-items-center"
      ref="appmain"
      style="width: 100vw; height: 100vh"
   >
      <StartVue v-if="!store.isGameStarted" />
      <GameVue
         @targetClick="shake"
         class="anim-onstart-reverse"
         v-if="store.isGameStarted"
      />
   </div>
</template>

<script setup lang="ts">
import GameVue from './components/Game.vue';
import StartVue from './components/Start.vue';
import store from './gameStore';

ref: appmain = null as null | HTMLDivElement;
const shake = () => {
   const el = appmain!;
   el.style.animation = 'shaking .300s linear';

   setTimeout(() => {
      el.style.animation = '';
   }, 150);
};
</script>

<style lang="scss">
:root {
   --dark: #000;
   --yellow: #fbff00;
   --purple: #4c00ff;
   --pink: #ff0080;
   --blue: #0076e4;
   --text-shadow: 4px 4px 1px var(--pink), -4px -4px 1px var(--purple);
   --box-shadow: 4px 4px 1px 1px var(--pink), -4px -4px 1px 1px var(--purple);
}

* {
   padding: 0;
   margin: 0;
   box-sizing: border-box;
}

body {
   background-color: var(--dark);
   font-family: 'VT323', monospace;
   max-width: 100vw;
   max-height: 100vh;
   overflow: hidden;
   transition: filter 0.5s;
}

@media screen and (max-width: 750px) {
   body {
      overflow: auto !important;
   }
}

.fs-small {
   font-size: 20px;
}
.fs-medium {
   font-size: 35px;
}
.fs-huge {
   font-size: 55px;
}

.anim-onstart-reverse {
   animation: 0.5s onstart ease reverse;
}

@keyframes onstart {
   0% {
      transform: scale(1);
   }
   66% {
      opacity: 1;
   }
   100% {
      opacity: 0;
      transform: scale(10);
   }
}

@keyframes rolling {
   0% {
      transform: rotate(0deg);
   }
   100% {
      transform: rotate(360deg);
   }
}

@keyframes shaking {
   0% {
      transform: translateX(2px) translateY(3px);
   }
   15% {
      transform: translateX(3px) translateY(-1px);
   }
   30% {
      transform: translateX(-1px) translateY(2px);
   }
   60% {
      transform: translateX(-2px) translateY(-4px);
   }
   75% {
      transform: translateX(2px) translateY(-3px);
   }
   100% {
      transform: translateX(0px) translateY(0px);
   }
}
@keyframes slash {
   0% {
      transform: rotate(0deg);
   }
   100% {
      transform: rotate(135deg);
   }
}
@keyframes skewing {
   0% {
      transform: skew(0deg, 0deg);
   }
   25% {
      transform: skew(2deg, 4deg);
   }
   50% {
      transform: skew(0deg, 2deg);
   }
   75% {
      transform: skew(-3deg, -4deg);
   }
   100% {
      transform: skew(0deg, 0deg);
   }
}
</style>

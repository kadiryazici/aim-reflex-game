<template>
   <div class="wrapper mx-auto w-75">
      <div
         :style="[
            {
               width: `${store.progress < 0 ? '0' : store.progress}%`,
               transition: 'width .1s linear',
            },
            store.progress < 40
               ? {
                    animation: '.20s shaking infinite',
                    backgroundColor: 'red',
                 }
               : {},
         ]"
         class="progress"
      ></div>
   </div>
</template>

<script lang="ts" setup>
import store from '/src/gameStore';
</script>

<style lang="scss" scoped>
.wrapper {
   width: 100%;
   height: 60px;
   max-height: 60px;
   border: 3px solid var(--yellow);
   padding: 5px;
   background-color: var(--dark);
   overflow: hidden;
   box-shadow: var(--box-shadow);
   .progress {
      height: 100%;
      background-color: yellow;
   }
}
</style>

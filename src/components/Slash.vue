<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'done'): void;
}>();
</script>

<template>
  <div class="mr-5 slash">
    <div @animationend="() => emit('done')"></div>
  </div>
</template>

<style lang="scss" scoped>
.slash {
  width: 35px;
  height: 35px;
  display: inline-block;
  // background-color: rgba(#fff, 0.2);
  position: absolute;
  z-index: 500;
  // pointer-events: none;   pointer-events: none;

  div {
    // pointer-events: none;
    width: 35px !important;
    height: 35px !important;
    position: relative;
    animation: 0.1s slash linear;

    box-shadow: -10px 0px 1px -5px #fff;
    border-radius: 50%;
  }
}
</style>

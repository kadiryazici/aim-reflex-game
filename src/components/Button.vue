<template>
  <div class="main position-relative">
    <div
      v-for="(color, index) in ['blue', 'purple', 'pink']"
      :key="color"
      :style="{
        color: `--${color}`,
        boxShadow: `-8px 0px 1px 1px var(--${color})`,
        transform: `rotate(${index * 92}deg)`,
      }"
      :class="['circle']"
    ></div>
    <div class="fs-huge start-text"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
.main {
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

  .circle {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    border-radius: 50%;
    animation: 1s rolling linear infinite;

    &:nth-child(1) {
      width: 100%;
      height: 100%;
      animation-delay: -0.19s;
      animation-duration: 1s;
    }
    &:nth-child(2) {
      width: 80%;
      height: 80%;
      animation-duration: 1.4s;
      animation-delay: -0.48s;
    }
    &:nth-child(3) {
      width: 60%;
      height: 60%;
      animation-delay: -0.88s;
      animation-duration: 0.6s;
    }
  }
}
.start-text {
  color: var(--yellow);
  text-shadow: var(--text-shadow);
}

@media screen and (max-width: 750px) {
  .main {
    width: 200px !important;
    height: 200px !important;

    .start-text {
      font-size: 35px;
    }
  }
}
</style>

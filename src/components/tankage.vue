<template>
  <div class="tankage">
    <header
      v-if="props.title"
      class="w-full pb-5px pt-3px text-30px tankage__header">
      {{ props.title }}
    </header>
    <slot></slot>

    <div class="absolute tankage__top-left"></div>
    <div class="absolute tankage__top-reight"></div>
    <div class="absolute tankage__bottom-left"></div>
    <div class="absolute tankage__bottom-reight"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})
</script>

<style lang="scss" scoped>
.tankage {
  width: 100%;
  height: 100%;
  // padding: 5px 0px;
  overflow: hidden;
  position: relative;
  // background: linear-gradient(0deg, rgb(68, 199, 211), blue);

  border: 2px solid rgba(68, 104, 211, 0.3);
  box-shadow: rgba(163, 204, 225, 0.35) 0px 5px 15px;
  border-radius: 10px;

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #a1c4fd1b 0%, #c2e9fb3e 100%);
    // font-size: 25px;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 5px;
    // background-image: url('../assets/title.jpg');
  }
  &__top-left {
    transform: rotate(-90deg);
    top: 0;
    left: 0;
  }
  &__top-reight {
    top: 0;
    right: 0;
  }
  &__bottom-left {
    bottom: 0;
    left: 0;
    transform: rotate(-180deg);
  }
  &__bottom-reight {
    bottom: 0;
    right: 0;
    transform: rotate(90deg);
  }
  &:hover {
    transform: scale(1.01);
  }
}

.absolute {
  position: absolute;
  width: 30px;
  height: 30px;
  background: url('https://static.weixiaotong.com.cn/static/icon/data_screen/monitoring-screen/card-angle1.svg')
    no-repeat;
}
</style>

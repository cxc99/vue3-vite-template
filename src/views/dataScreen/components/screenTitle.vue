<template>
  <div class="title">
    <div class="title__content">测试</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.title {
  width: 100vw;
  display: flex;
  min-height: 100px;
  justify-content: center;
  align-items: center;
  background: url('https://static.weixiaotong.com.cn/static/icon/data_screen/monitoring-screen/bg_title.svg')
    no-repeat;
  background-size: 100%;

  &__content {
    font-size: 35px;
    background-image: -webkit-linear-gradient(
      bottom,
      #2eb4fc,
      #7eb4ee,
      #eeeeee
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>

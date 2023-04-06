<template>
  <div class="pedestal-button">内容</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.pedestal-button {
  display: grid;
  place-items: center;
  margin: 0px 5px;
  width: 100%;
  height: 100%;
  background: url('@/assets/pedestal.png') no-repeat;
  background-size: 100% 100%;

  &:hover {
    cursor: pointer;
    animation: pedestall 3s ease;
    @keyframes pedestall {
      from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  }
}
</style>

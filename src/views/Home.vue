<template>
  <div class="home">
    <div class="flex">
      <c-button
        lable="bio"
        class="w-100px h-40px mr-20px"
        @click="onPage"></c-button>
      <c-button
        lable="dome"
        class="w-100px h-40px mr-20px"
        @click="onPage"></c-button>
      <c-button
        lable="mapbox"
        class="w-100px h-40px"
        @click="onPage"></c-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CButton from '@/components/CButton.vue'

defineComponent({
  CButton,
})

function onPage() {
  console.log(123)
}
onMounted(() => {})
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}
</style>

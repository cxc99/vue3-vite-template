<template>
  <div class="home">
    <div class="flex">
      <c-button
        lable="个人简介"
        class="w-100px h-40px mr-20px"
        @click="onPage"></c-button>
      <c-button
        lable="dome"
        class="w-100px h-40px mr-20px"
        @click="onPage"></c-button>
      <c-button
        lable="mapbox-gl"
        class="w-110px h-40px mr-20px"
        @click="onPage('/')"></c-button>
      <c-button
        lable="大屏"
        class="w-100px h-40px"
        @click="onPage('/dataScreen')"></c-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CButton from '@/components/CButton.vue'

defineComponent({
  CButton,
})
const router = useRouter()

function onPage(url = '/') {
  router.push(url)
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

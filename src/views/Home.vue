<template>
  <div class="home" ref="home">
    <div class="flex">
      <c-button
        lable="前往后台"
        class="w-100px h-40px mr-20px"
        @click="onPage('/loign')"></c-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const home = ref(null)
function onPage(url = '/') {
  router.push(url)
}

onMounted(() => {
  //@ts-ignore
  VANTA.CELLS({
    el: home.value,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
  })
})
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}
</style>

<template>
  <div class="home" ref="home">
    <div class="flex">
      <c-button
        lable="前往后台"
        class="w-100px h-40px mr-20px"
        @click="onPage('/loign')"></c-button>
    </div>

    <div class="w-500px h-500px bg-red-200 relative">
      <div v-draggable class="w-full h-100px bg-blue-300">轮播图</div>
      <div class="button-group" v-draggable>
        <c-button lable="按钮" class="w-100px h-40px"></c-button>
      </div>
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
  // VANTA.CLOUDS({
  //   el: home.value,
  //   mouseControls: true,
  //   touchControls: true,
  //   gyroControls: false,
  //   minHeight: 200.0,
  //   minWidth: 200.0,
  //   scale: 1.0,
  // })
})
</script>

<style lang="scss" scoped>
.button-group {
  // position: absolute;
  // left: 50%;
  // bottom: 10%;
  // transform: translate(-50%, -50%);
}
.home {
  width: 100vw;
  height: 100vh;
  // display: grid;
  // place-items: center;
}
</style>

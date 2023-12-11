<template>
  <div class="home">
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

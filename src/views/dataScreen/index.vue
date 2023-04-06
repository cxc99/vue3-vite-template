<template>
  <div class="home">
    <screen-title></screen-title>
    <div class="flex w-screen">
      <div class="w-2/7 home__height">
        <left-screen></left-screen>
      </div>
      <div class="w-3/7 pb-20px">
        <div class="h-2/7 home-center">
          <appearance></appearance>
        </div>
        <Map></Map>
        <div class="h-1/7 pb-1px">
          <!-- <tankage>
            <div class="home__pedesta h-full py-20px px-50px">
              <pedestal-button v-for="i of 4" :key="i"></pedestal-button>
            </div>
          </tankage> -->
        </div>
      </div>
      <div class="w-2/7">
        <right-screen></right-screen>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import screenTitle from './components/screenTitle.vue'
import leftScreen from './components/leftScreen.vue'
import rightScreen from './components/rightScreen.vue'
import appearance from './components/appearance.vue'
// import pedestalButton from './components/pedestalButton.vue'
import Map from './components/map.vue'
defineComponent({
  screenTitle,
  Map,
  leftScreen,
  appearance,
  rightScreen,
  // pedestalButton,
})

onMounted(() => {
  console.log(callApi)
})
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/bg3.webp');
  background-size: 100% 100%;
  color: #fff;
  &__height {
    height: calc(100vh - 100px);
  }
  &-center {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  &__pedesta {
    display: flex;
    justify-content: space-around;
    // justify-content: space-between;
    align-items: center;
  }
}
</style>

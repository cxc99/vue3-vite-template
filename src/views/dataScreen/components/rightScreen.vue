<template>
  <div class="px-20px h-full w-full">
    <div class="h-1/3 pb-20px">
      <tankage title="突发状况">
        <warning />
      </tankage>
    </div>
    <div class="h-1/3 pb-20px">
      <tankage></tankage>
    </div>
    <div class="h-1/3 pb-20px">
      <!-- <tankage title="视频">
        <div class="h-full w-full">
          <carousel-video></carousel-video>
        </div>
      </tankage> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import warning from './warning/index.vue'
import carouselVideo from './carouselVideo/index.vue'
import tankage from '@/components/tankage.vue'

defineComponent({ warning, carouselVideo, tankage })
</script>

<style lang="scss" scoped>
.max-height {
  // max-height: calc(33.3vh - 100px);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>

<template>
  <div class="text-center h-full">
    <div class="demonstration">
      Switch when indicator is hovered (default)
    </div>

    <el-carousel pause-on-hover indicator-position="none" :autoplay="false">
      <el-carousel-item v-for="item in 4" :key="item">
        <video class=" w-full" controls>
          <source :src="srcUrl" type="video/mp4" />
        </video>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import url from '@/assets/ches.mp4'
const srcUrl = ref(url)
</script>

<style lang="scss" scoped>
.demonstration {
  color: var(--el-text-color-secondary);
  padding: 20px 0px;
}

.el-carousel {
  // background: red;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item {
  display: flex;
  justify-content: center;
}

// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }
</style>

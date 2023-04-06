<template>
  <div id="pie" class="w-1/2 h-full"></div>
</template>

<script setup lang="ts">
import { pieChartOption } from '../../disposition'
import * as echarts from 'echarts'
// const echarts =
//   getCurrentInstance()!.appContext.config.globalProperties.$echarts

onMounted(() => {
  const pie = document.getElementById('pie') as any
  console.log(pieChartOption, echarts)

  echarts.init(pie).setOption(pieChartOption)
})
</script>

<style lang="scss" scoped></style>

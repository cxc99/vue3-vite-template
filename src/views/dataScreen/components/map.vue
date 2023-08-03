<template>
  <div id="map" class="w-full h-4/7" style=""></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { optionMap } from '../eharthDome/option'
import map from '../eharthDome/map.json'
import china from '@/assets/map/china.json'

let mapData: any = china

onMounted(() => {
  const myChartMap = echarts.init(document.getElementById('map')!)
  // // getMapList()
  echarts.registerMap('chinaMap', mapData)
  myChartMap.setOption(optionMap)

  myChartMap.on('click', param => {
    console.log(param)
  })
})
</script>

<style lang="scss" scoped></style>

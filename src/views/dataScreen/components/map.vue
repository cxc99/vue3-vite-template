<template>
  <div id="map" class="w-full h-4/7" style=""></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { optionMap } from '../eharthDome/option'
import map from '../eharthDome/map.json'

let mapData: any = map

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

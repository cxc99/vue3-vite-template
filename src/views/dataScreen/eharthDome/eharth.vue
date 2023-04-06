<template>
  <div class="eharth-dome flex">
    <div id="main" style="width: 600px; height: 400px"></div>
    <div id="map" style="width: 800px; height: 400px"></div>
  </div>
</template>

<script setup lang="ts">
// import { echarts } from '../../eharth'
import * as echarts from 'echarts'
import { optionLine, optionMap } from './option'
import map from './map.json'

// https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=330000_full
let mapData: any = map

// const getMapList = async () => {
//   try {
//     const data = await callApi.get('/areas_v3/bound/geojson', {
//       code: '330000_full',
//     })
//     console.log(data, '地图JSON')
//     mapData = data
//   } catch (error) {
//     console.log(error)
//   }
// }
onMounted(() => {
  const myChart = echarts.init(document.getElementById('main')!)
  myChart.setOption(optionLine)

  const myChartMap = echarts.init(document.getElementById('map')!)
  // getMapList()
  echarts.registerMap('chinaMap', mapData)
  myChartMap.setOption(optionMap)

  myChartMap.on('click', param => {
    console.log(param)
  })
})
</script>

<style lang="scss" scoped>
.eharth-dome {
  background: skyblue;
}
</style>

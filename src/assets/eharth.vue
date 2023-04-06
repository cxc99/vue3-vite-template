<template>
  <div class="eharth-dome flex">
    <div id="main" style="width: 600px; height: 400px"></div>
    <div id="map" style="width: 800px; height: 400px"></div>
  </div>
  <div>
    <div id="threeMap" style="width: 800px; height: 400px"></div>
  </div>
</template>

<script setup lang="ts">
// import { echarts } from '../../eharth'
import * as echarts from 'echarts'
import { optionLine, optionMap, mapBoxOpt } from '../views/eharthDome/option'
import map from '../views/eharthDome/map.json'

// https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=330000_full
let mapData: any = map
const urls = new URL('@/assets/map_bg.png', import.meta.url).href
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
  mapboxgl.accessToken =
    'pk.eyJ1IjoieGlueGlhbmciLCJhIjoiY2w0ZTNnMGs3MDBkdzNscDBjb3pjaWQ5YiJ9.d2Zjk81sQFYpiQ_BxiCHYA'
  const myChart = echarts.init(document.getElementById('main')!)
  myChart.setOption(optionLine)

  const myChartMap = echarts.init(document.getElementById('map')!)
  // getMapList()
  echarts.registerMap('chinaMap', mapData)
  myChartMap.setOption(optionMap)

  const threeMap = echarts.init(document.getElementById('threeMap')!)
  threeMap.setOption(mapBoxOpt)
  // .getMapbox()
  // .getComponent('mapbox3D')
  const glMap = threeMap.getModel().getComponent('mapbox3D')
  console.log(glMap)

  myChartMap.on('click', param => {
    console.log(param)
  })

  glMap.on('load', e => {
    glMap.setMaxZoom(17)
    glMap.setMinZoom(6)
    glMap.addSource('bg_img', {
      type: 'image',
      url: urls,
      coordinates: [
        [110.49, 33.89],
        [129.99, 33.89],
        [129.99, 23.89],
        [110.49, 23.89],
      ],
    })
  })
})
</script>

<style lang="scss" scoped>
.eharth-dome {
  background: skyblue;
}
</style>

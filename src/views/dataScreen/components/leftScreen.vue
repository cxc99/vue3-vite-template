<template>
  <div class="px-20px h-full w-full">
    <div class="h-1/3">
      <tankge title="supier">
        <div id="bar" class="w-full h-4/5"></div>
      </tankge>
    </div>
    <div class="h-2/3 py-20px">
      <tankge title="emmm">
        <div class="w-full h-full">
          <!-- <div id="system" class="w-1/2 h-3/5"></div> -->
          <div class="flex w-full h-1/2">
            <radars></radars>

            <echart-compoent
              id="id"
              :option="dataOpton"
              class="w-1/2 h-full"></echart-compoent>
            <!-- <custom-chart></custom-chart> -->
          </div>

          <div class="w-full h-1/2">
            <echart-compoent
              id="line"
              :option="lineColumnOption"
              class="w-full h-full"></echart-compoent>
            <!-- lineColumnOption -->
          </div>
        </div>
      </tankge>
    </div>
  </div>
</template>

<script setup lang="ts">
import tankge from '@/components/tankage.vue'
import radars from './chartArea/radar.vue'
import customChart from './chartArea/customChart.vue'
import { categoryOption, systemOption } from '../disposition'
import { lineColumnOption } from '../disposition/lineColumn'
import { option } from '../disposition/gaugeOption'
import EchartCompoent from '@/components/echart.vue'
import * as echarts from 'echarts'
defineComponent({ tankge, radars, customChart, EchartCompoent })

const tiem = ref()

const dataOpton = reactive(option)

onMounted(() => {
  const bar = document.getElementById('bar') as any
  const myChart = echarts.init(bar)
  myChart.setOption(categoryOption)

  // const system = document.getElementById('system')
  // const myChartSystem = echarts.init(system)
  // myChartSystem.setOption(systemOption)

  if (tiem.value) clearInterval(tiem.value)

  const {
    data: { value },
  } = toRefs(dataOpton.series[0]) // 感觉这个结构可有可无

  tiem.value = setInterval(() => {
    value[0].value = +(Math.random() * 100).toFixed(2)
    value[1].value = +(Math.random() * 100).toFixed(2)
    value[2].value = +(Math.random() * 100).toFixed(2)
  }, 5000)
})

onUnmounted(() => {
  clearInterval(tiem.value)
})
</script>

<style lang="scss" scoped></style>

import dayjs from 'dayjs'
// import { getCurrentInstance } from 'vue'
import * as echarts from 'echarts/core'
// const echart = getCurrentInstance()!.appContext.config.globalProperties.$echarts
const category: string[] = []
const dottedBase: string = dayjs().format('YYYY-MM-DD')
const lineData: number[] = []
const barData: number[] = []

for (let i = 0; i < 20; i++) {
  category.push(dayjs(dottedBase).add(i, 'day').format('MM-DD'))
  let barNuber = Math.random() * 10000
  let lineNuber = Math.random() * 10000
  barData.push(barNuber)
  lineData.push(lineNuber + barNuber)
}
// option
export const lineColumnOption = {
  grid: {
    right: '10',
  },
  // backgroundColor: '#0f375f',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['line', 'bar'],
    textStyle: {
      color: '#ccc',
    },
  },
  xAxis: {
    data: category,
    axisLine: {
      lineStyle: {
        color: '#ccc',
      },
    },
  },
  yAxis: {
    splitLine: { show: false },
    axisLine: {
      lineStyle: {
        color: '#ccc',
      },
    },
  },
  series: [
    {
      name: 'line',
      type: 'line',
      smooth: true,
      showAllSymbol: true,
      symbol: 'emptyCircle',
      symbolSize: 8,
      data: lineData,
    },
    {
      name: 'bar',
      type: 'bar',
      barWidth: 5,
      itemStyle: {
        borderRadius: 5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#14c8d4' },
          { offset: 1, color: '#43eec6' },
        ]),
      },
      data: barData,
    },
    {
      name: 'line',
      type: 'bar',
      barGap: '-100%',
      barWidth: 5,
      itemStyle: {
        // color: [
        //   { offset: 0, color: 'rgba(20,200,212,0.5)' },
        //   { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
        //   { offset: 1, color: 'rgba(20,200,212,0)' },
        // ],
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(20,200,212,0.5)' },
          { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
          { offset: 1, color: 'rgba(20,200,212,0)' },
        ]),
      },
      z: -12,
      data: lineData,
    },
    {
      name: 'dotted',
      type: 'pictorialBar',
      symbol: 'rect',
      itemStyle: {
        color: '#0f375f',
      },
      symbolRepeat: true,
      symbolSize: [12, 4],
      symbolMargin: 1,
      z: -10,
      data: lineData,
    },
  ],
}

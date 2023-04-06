<template>
  <div id="main" class="w-1/2 h-full"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'

const ROOT_PATH =
  'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'

const _panelImageURL = ROOT_PATH + '/data/asset/img/custom-gauge-panel.png'
const _animationDuration = 1000
const _animationDurationUpdate = 1000
const _animationEasingUpdate = 'quarticInOut'
const _valOnRadianMax = 200 // 总值
const _outerRadius = 200 // 外层宽度
const _innerRadius = 170
const _pointerInnerRadius = 40
const _insidePanelRadius = 140
const _currentDataIndex = 0

function renderItem(params, api) {
  const valOnRadian = api.value(1)
  const coords = api.coord([api.value(0), valOnRadian])
  const polarEndRadian = coords[3]
  const imageStyle = {
    image: _panelImageURL,
    x: params.coordSys.cx - _outerRadius,
    y: params.coordSys.cy - _outerRadius,
    width: _outerRadius * 2,
    height: _outerRadius * 2,
  }
  console.log(imageStyle, params.coordSys.cx, params.coordSys.cy)

  return {
    type: 'group',
    children: [
      {
        type: 'image',
        style: imageStyle,
        clipPath: {
          type: 'sector',
          shape: {
            cx: params.coordSys.cx,
            cy: params.coordSys.cy,
            r: _outerRadius,
            r0: _innerRadius,
            startAngle: 0,
            endAngle: -polarEndRadian,
            transition: 'endAngle',
            enterFrom: { endAngle: 0 },
          },
        },
      },
      {
        type: 'image',
        style: imageStyle,
        clipPath: {
          type: 'polygon',
          shape: {
            points: makePionterPoints(params, polarEndRadian),
          },
          extra: {
            polarEndRadian: polarEndRadian,
            transition: 'polarEndRadian',
            enterFrom: { polarEndRadian: 0 },
          },
          during: function (apiDuring) {
            apiDuring.setShape(
              'points',
              makePionterPoints(params, apiDuring.getExtra('polarEndRadian')),
            )
          },
        },
      },
      {
        type: 'circle',
        shape: {
          cx: params.coordSys.cx,
          cy: params.coordSys.cy,
          r: _insidePanelRadius,
        },
        style: {
          fill: '#fff',
          shadowBlur: 25,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(76,107,167,0.4)',
        },
      },
      {
        type: 'text',
        extra: {
          valOnRadian: valOnRadian,
          transition: 'valOnRadian',
          enterFrom: { valOnRadian: 0 },
        },
        style: {
          text: makeText(valOnRadian),
          fontSize: 40,
          fontWeight: 500,
          x: params.coordSys.cx,
          y: params.coordSys.cy,
          fill: 'rgb(0,50,100,0.5)',
          align: 'center',
          verticalAlign: 'middle',
          enterFrom: { opacity: 0 },
        },
        during: function (apiDuring) {
          apiDuring.setStyle(
            'text',
            makeText(apiDuring.getExtra('valOnRadian')),
          )
        },
      },
    ],
  }
}
function convertToPolarPoint(renderItemParams, radius, radian) {
  return [
    Math.cos(radian) * radius + renderItemParams.coordSys.cx,
    -Math.sin(radian) * radius + renderItemParams.coordSys.cy,
  ]
}
function makePionterPoints(renderItemParams, polarEndRadian) {
  return [
    convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
    convertToPolarPoint(
      renderItemParams,
      _outerRadius,
      polarEndRadian + Math.PI * 0.03,
    ),
    convertToPolarPoint(renderItemParams, _pointerInnerRadius, polarEndRadian),
  ]
}
function makeText(valOnRadian) {
  // Validate additive animation calc.
  if (valOnRadian < -10) {
    alert('illegal during val: ' + valOnRadian)
  }
  return ((valOnRadian / _valOnRadianMax) * 100).toFixed(0) + '%'
}
const option = {
  animationEasing: _animationEasingUpdate,
  animationDuration: _animationDuration,
  animationDurationUpdate: _animationDurationUpdate,
  animationEasingUpdate: _animationEasingUpdate,
  dataset: {
    source: [[1, 156]],
  },
  tooltip: {},
  angleAxis: {
    type: 'value',
    startAngle: 0,
    show: false,
    min: 0,
    max: _valOnRadianMax,
  },
  radiusAxis: {
    type: 'value',
    show: false,
  },
  polar: {},
  series: [
    {
      type: 'custom',
      // radius:'0%',
      coordinateSystem: 'polar',
      renderItem: renderItem,
    },
  ],
  // grid: {
  //   x: 35,
  //   y: 55,
  //   x2: 35,
  //   y2: 60,
  //   borderWidth: 1,
  // },
}

onMounted(() => {
  const chartDom = document.getElementById('main')
  const myChart = echarts.init(chartDom)
  myChart.setOption(option)

  // setInterval(function () {
  //   const nextSource = [[1, Math.round(Math.random() * _valOnRadianMax)]]
  //   myChart.setOption({
  //     dataset: {
  //       source: nextSource,
  //     },
  //   })
  // }, 3000)
})
</script>

<style lang="scss" scoped>
.dome {
  transform: rotate(0.7) !important;
}
</style>

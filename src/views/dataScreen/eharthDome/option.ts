import mapimg from './map.json'
export const optionLine = {
  title: {
    text: 'Stacked Area Chart',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top',
      },
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
}

export const optionMap = {
  // 背景颜色
  // backgroundColor: '#404a59',
  // 提示浮窗样式
  tooltip: {
    show: true,
    trigger: 'item',
    alwaysShowContent: false,
    backgroundColor: '#0C121C',
    borderColor: 'rgba(0, 0, 0, 0.16);',
    hideDelay: 100,
    triggerOn: 'mousemove',
    enterable: true,
    textStyle: {
      color: '#DADADA',
      fontSize: '12',
      width: 20,
      height: 30,
      overflow: 'break',
    },
    showDelay: 100,
  },
  // 地图配置
  geo: {
    map: 'chinaMap',
    aspectScale: 1,
    // roam: 'move',
    roam: true, // 是否开启平移所缩放
    // roam: false,
    // layoutCenter: ['85%', '100%'], // position位置s
    layoutSize: 500,
    // zoom: 1.5,
    label: {
      // 通常状态下的样式
      normal: {
        show: true,
        textStyle: {
          color: '#fff',
        },
      },
      // 鼠标放上去的样式
      emphasis: {
        textStyle: {
          color: '#fff',
        },
      },
    },
    // 地图区域的样式设置
    itemStyle: {
      normal: {
        borderColor: 'rgba(147, 235, 248, 1)',
        borderWidth: 1,
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(147, 235, 248, 0)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(147, 235, 248, .2)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        shadowColor: 'rgba(128, 217, 248, 1)',
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
      },
      // 鼠标放上去高亮的样式
      emphasis: {
        areaColor: '#389BB7',
        borderWidth: 0,
      },
    },
    // 这里是重点！！！
    regions: [
      {
        name: '南海诸岛',
        itemStyle: {
          // 隐藏地图
          normal: {
            opacity: 0, // 为 0 时不绘制该图形
          },
        },
        label: {
          show: false, // 隐藏文字
        },
      },
    ],
  },
}

export const mapBoxOpt = {
  mapbox: {
    style: mapimg,
    hash: false,
    center: [121.18, 28.65],
    zoom: 9,
    minZoom: 6,
    maxZoom: 17,
    pitch: 45,
    postEffect: {
      enable: true,
      screenSpaceAmbientOcclusion: {
        enable: true,
        intensity: 1.2,
        radius: 6,
        quality: 'low',
      },
      // screenSpaceReflection: {
      //   enable: true
      // }
    },
    light: {
      main: {
        intensity: 1,
        shadow: true,
        shadowQuality: 'low',
      },
      ambient: {
        intensity: 0.0,
      },
      ambientCubemap: {
        // texture: '../data/ambientCubemapTexture.hdr',
        // exposure: 1,
        // diffuseIntensity: 0.5,
        // specularIntensity: 2
      },
    },
  },
  series: [
    {
      type: 'lines3D',
      coordinateSystem: 'mapbox',
      effect: {
        show: true,
        period: 10,
        constantSpeed: 0,
        trailWidth: 1,
        trailLength: 0.4,
        trailOpacity: 0.5,
        spotIntensity: 1,
      },
      blendMode: 'lighter',
      polyline: true,
      lineStyle: {
        width: 4,
        color: 'rgb(200, 40, 0)',
        opacity: 0.5,
      },
      data: [],
    },
  ],
}

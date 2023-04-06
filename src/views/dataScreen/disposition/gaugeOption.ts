export const gaugeData = [
  {
    value: 20,
    name: 'Perfect',
    title: {
      offsetCenter: ['0%', '-45%'],
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '-30%'],
    },
  },
  {
    value: 40,
    name: 'Good',
    title: {
      offsetCenter: ['0%', '-10%'],
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '5%'],
    },
  },
  {
    value: 60,
    name: 'Commonly',
    title: {
      offsetCenter: ['0%', '25%'],
    },
    detail: {
      valueAnimation: true,
      offsetCenter: ['0%', '42%'],
    },
  },
]
export const option = {
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          borderWidth: 1,
          borderColor: '#464646',
        },
      },
      axisLine: {
        lineStyle: {
          width: 30,
        },
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        distance: 50,
      },
      data: gaugeData,
      title: {
        fontSize: 12,
        color: '#fff',
      },
      detail: {
        width: 50,
        height: 5,
        fontSize: 12,
        color: 'auto',
        borderColor: 'auto',
        borderRadius: 20,
        borderWidth: 1,
        padding: [5, 5, 5, 5],
        formatter: '{value}%',
      },
    },
  ],
}

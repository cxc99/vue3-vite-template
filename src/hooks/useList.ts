export function useList() {
  const tableData = ref<any>([])

  const page = ref({
    pageNo: 1,
    pageSize: 10,
    total: 0,
  })

  /**
   *
   * @param url
   * @param parmas
   * dataList 和dataTotal 赋值
   */

  const reFindList = async (url: string, parmas: Record<string, any>) => {
    const { data } = await callApi.post(url, parmas)
    tableData.value = data?.dataList || []
    page.value.total = data?.dataTotal || 0
    try {
    } catch (error) {
      console.log(error)
    }
  }

  const reFindGetList = async (url: string, parmas: Record<string, any>) => {
    const { data } = await callApi.get(url, parmas)

    tableData.value = data?.list || []
    page.value.total = data?.total || 0
    try {
    } catch (error) {
      console.log(error)
    }
  }

  return { reFindList, tableData, page, reFindGetList }
}

export function useTable() {
  // 表格头部样式
  const runStyle = () => {
    return {
      height: '46px',
      'background-color': '#f5f6fb',
    }
  }
  //（0是待开发，1是开发中，2是已完成）
  const options = [
    {
      type: 0,
      name: '待进行',
    },
    {
      type: 1,
      name: '进行中',
    },
    {
      type: 2,
      name: '已完成',
    },
  ]

  // 工作状态转化
  const grantStatusStr = computed(() => {
    return (type: number | string) => {
      const enu = new Map([
        ['0', '待进行'],
        ['1', '进行中'],
        ['2', '已完成'],
      ])

      return enu.get(type + '')
    }
  })

  // 工作状态转化
  const grantStatusClass = computed(() => {
    return (type: number | string) => {
      const enu = new Map([
        ['0', 'text-orange-400'],
        ['1', 'text-blue-400'],
        ['2', 'text-green-500'],
      ])

      return enu.get(type + '')
    }
  })

  return {
    runStyle,
    options,
    grantStatusStr,
    grantStatusClass,
  }
}

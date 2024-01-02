<template>
  <div>
    <el-table ref="tableRef" :data="tableData" :border="config.isBorder">
      <el-table-column
        v-for="item in columns"
        align="center"
        :key="item.title"
        :prop="item.field"
        :label="item.title"
        :width="item.width">
        <template #default="{ row }">
          <template v-if="$slots[item.field]">
            <slot
              :name="item.field"
              :value="row[item.field]"
              :rowData="row"></slot>
          </template>
          <div v-else>{{ row[item.field] }}</div>
        </template>
      </el-table-column>

      <slot name="handle"></slot>
    </el-table>

    <Pagination v-model:page="page" :fn="init"></Pagination>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useList } from '@/hooks/useList'

import Pagination from '@/components/Pagination/index.vue'

interface Config {
  apiUrl: string
  apiMethod: string
  isBorder?: boolean
}

interface Columns {
  title: string
  width: string
  field: string
}

interface Prop {
  form?: Record<string, any>
  config: Config
  columns?: Columns[]
}

const props = withDefaults(defineProps<Prop>(), {
  form: () => {
    return {}
  },

  columns: () => [
    { title: '活动ID', width: '', field: 'stortActivityId' },
    { title: '商城活动名称', width: '', field: 'stortActivityName' },
    { title: '商城活动代码', width: '', field: 'stortActivityCode' },
    { title: '银行名称', width: '', field: 'staffBankName' },
    { title: '银行code', width: '', field: 'bankCode' },
    { title: '活动状态', width: '', field: 'stortActivityStatus' },
    { title: '活动类型', width: '', field: 'stortActivityType' },
    { title: '开始时间', width: '', field: 'startTime' },
    { title: '结束时间', width: '', field: 'endTime' },
  ],

  config: () => {
    return {
      apiUrl: '/store/activity/getPage', // 请求的url
      apiMethod: 'post',
      isBorder: true,
    }
  },
})

const { reFindList, reFindGetList, tableData, page } = useList()

async function init() {
  props.config.apiMethod == 'post'
    ? await reFindList(props.config.apiUrl, { ...page.value, ...props.form })
    : await reFindGetList(props.config.apiUrl, {
        ...page.value,
        ...props.form,
      })

  // tableData.value = [{}]; // 调试用
}

onMounted(() => {
  init()
})

defineExpose({
  init,
})
</script>

<style lang="less" scoped></style>

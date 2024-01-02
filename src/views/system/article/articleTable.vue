<template>
  <div class="bg-[#ffffff] p-10px">
    <!-- ## GroupInout 文档请看 /components/GroupInout/index.vue -->
    <GroupInout
      @onRefresh="onRefresh"
      v-model:form="example.form"
      :formItem="example.formItem"
      :config="example.config"></GroupInout>
    <TableTmp
      ref="table"
      :form="example.form"
      :columns="example.columns"
      :config="example.tableConfig">
      <!-- 动态插槽例子 -->
      <!-- <template #staffBankName="{ value }">
        {{ value + " 审核" }}
      </template> -->

      <template #handle>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <div class="text-[#1a7eea]">
              <span class="cursor-pointer">查看</span>
            </div>
          </template>
        </el-table-column>
      </template>
    </TableTmp>
  </div>
</template>

<script setup lang="ts">
import TableTmp from '@/components/TableTmp/index.vue'
import { example } from './articleTable'

import GroupInout from '@/components/GroupInout/index.vue'

const table = ref(null) as any

const onRefresh = () => {
  table.value.init()
}

onActivated(() => {
  // onRefresh()
})
</script>

<style scoped></style>

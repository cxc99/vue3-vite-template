<template>
  <div class="px-20px">
    <div class="pb-10px">
      <el-button type="primary" @click="reUpdataRoles">设置</el-button>
      <el-button type="success" @click="onReset">重置</el-button>
    </div>

    <div class="flex">
      <Tree @onNodeClick="handleNodeClick"></Tree>

      <div class="w-full">
        <el-table :data="storeRoute.getMenu" border show-overflow>
          <el-table-column label="应用" width="180" align="center">
            <template #default="{ row }">
              <el-checkbox-group v-model="info.rules">
                <el-checkbox :key="row.id" :label="row.id">
                  {{ row.title }}
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column label="路由" align="center">
            <template #default="{ row }">
              <el-checkbox-group v-model="info.rules">
                <el-checkbox
                  v-for="(group, index) in row.children"
                  :key="group.id"
                  :label="group.id">
                  {{ group.title }}
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>

          <el-table-column label="按钮" align="center">
            <template #default="{ row }">
              <el-checkbox-group
                v-model="info.buttonRules"
                class="flex justify-center">
                <div
                  v-for="(group, index) in row.children"
                  :key="index"
                  class="pr-5px">
                  <el-checkbox
                    v-for="(targe, targeIndex) in group.meta.buttonRules"
                    :key="targe"
                    :label="targe">
                    {{ group.title }} : {{ targe }}
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import Tree from './components/Tree.vue'

import { routeStore } from '@/pinia/modules/route'

const storeRoute = routeStore()

const info = ref({
  id: '',
  rules: [],
  buttonRules: [],
})

const onReset = () => {
  info.value.rules = []
  info.value.buttonRules = []
}

const handleNodeClick = (targe: any) => {
  info.value = targe
}

const reUpdataRoles = async () => {
  try {
    const { code, data } = await callApi.post('/role/updata', info.value)

    code == 200 && ElMessage.success('更新成功')
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped></style>

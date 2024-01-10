<template>
  <div class="px-20px">
    <div class="py-10px flex justify-between">
      <el-button v-premission="['admin']">新增角色</el-button>

      <div>
        <el-button type="primary" @click="reUpdataRoles">设置</el-button>
        <el-button type="success" @click="onReset">重置</el-button>
      </div>
    </div>
    <div class="flex">
      <div class="w-[20%]">
        <el-tree
          ref="treeRef"
          :data="threeData"
          :props="props"
          highlight-current
          default-expand-all
          :default-expanded-keys="[1]"
          @node-click="handleNodeClick"
          node-key="id" />
        {{ info.rules }}
        {{ info.buttonRules }}
      </div>

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
import { routeStore } from '@/pinia/modules/route'

import { user } from '@/pinia/modules/user'

interface Tree {
  id: string
  label: string
  children?: Tree[]
}

const storeRoute = routeStore()
const storeUser = user()
const props = {
  value: 'id',
  label: 'name',
  children: 'children',
}
const addRoutes = ref()
const threeData = ref<Tree[]>([])
const treeRef = ref(null) as any

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

const initRole = async () => {
  try {
    const { data } = await callApi.post('/userRole/roleList', {
      deptId: storeUser.deptId,
    })
    threeData.value = data
    nextTick(() => {
      treeRef.value.setCurrentKey(data[0].id)

      info.value = data[0]
    })
  } catch (error) {
    console.log(error)
  }
}

const reUpdataRoles = async () => {
  try {
    const { code, data } = await callApi.post('/userRole/updata', info.value)

    console.log(code, data)

    if (code == 200) {
      initRole()
      ElMessage.success('更新成功')
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  initRole()
})
</script>

<style></style>

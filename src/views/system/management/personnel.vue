<template>
  <div class="px-20px">
    <div><el-button>新增角色</el-button></div>
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
      </div>

      <div class="w-full">
        <el-table :data="addRoutes" border show-overflow>
          <el-table-column label="应用" width="180" align="center">
            <template #default="{ row }">
              <el-checkbox-group v-model="info.rules">
                <el-checkbox :key="row.id" :label="row.id">
                  {{ row.title }}
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column label="功能" align="center">
            <!-- <template #default="{ row }">
              <el-checkbox-group v-model="info.rules">
                <el-checkbox
                  v-for="(group, index) in row.children"
                  :key="group.id"
                  :label="group.id">
                  {{ group.title }}
                </el-checkbox>
              </el-checkbox-group>
            </template> -->
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tree {
  id: string
  label: string
  children?: Tree[]
}

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
})

const handleNodeClick = (targe: any) => {
  info.value = targe
}

const initRole = async () => {
  try {
    const { data } = await callApi.post('/userRole/roleList', { deptId: 0 })
    threeData.value = data
    nextTick(() => {
      treeRef.value.setCurrentKey(data[0].id)
      info.value = data[0]
    })
  } catch (error) {
    console.log(error)
  }
}

const initRouter = async () => {
  try {
    const { data } = await callApi.get('/routes/all')
    console.log(data)
    addRoutes.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  initRole()
  initRouter()
})
</script>

<style></style>

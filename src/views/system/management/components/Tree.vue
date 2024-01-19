<template>
  <div class="w-[20%]">
    <el-tree
      ref="treeRef"
      :data="threeData"
      :props="treeProps"
      highlight-current
      default-expand-all
      :default-expanded-keys="[1]"
      @current-change="handleNodeClick"
      :expand-on-click-node="false"
      node-key="id">
      <template #="{ node, data }">
        <div class="flex justify-between w-full">
          <div>{{ data.name }}</div>

          <div class="pr-10px" v-premission="['admin']">
            <el-icon @click.stop="onChangeRole(data, 'add')"><Plus /></el-icon>

            <el-icon class="mx-5px" @click.stop="onChangeRole(data, 'edit')">
              <Edit />
            </el-icon>
          </div>
        </div>
      </template>
    </el-tree>

    <Dialog v-model:show="show" title="角色分配" :fn="onSubmit">
      <FormConfig
        ref="formConfig"
        :form="form"
        :formItem="formItem"></FormConfig>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import FormConfig from '@/components/FormConfig/index.vue'
import { user } from '@/pinia/modules/user'
import Dialog from '@/components/Dialog/index.vue'
//
interface Tree {
  id: string
  name: string
  children?: Tree[]
  parentId: number
  roleType: string
  deptId: string
  buttonRules: string[]
  rules: string[]
}

const storeUser = user()

const threeData = ref<Tree[]>([])

const treeRef = ref(null) as any

const formConfig = ref(null) as any

const form = ref({
  parentId: 1,
  deptId: '',
  name: '',
  roleType: '',
  id: null,
  // buttonRules: [],
  // rules: [],
})

const formItem = ref([
  {
    label: '角色代码',
    key: 'deptId',
    type: 'input',
    required: true,
    placeholder: '',
    options: [{ type: 1, name: '1' }],
    span: 24,
    labelWidth: 100,
  },
  {
    label: '角色名称',
    key: 'name',
    type: 'input',
    required: true,
    placeholder: '',
    span: 24,
    labelWidth: 100,
  },
  {
    label: '角色类型',
    key: 'roleType',
    type: 'select',
    required: true,
    placeholder: '',
    options: [
      { type: 'test', name: '测试' },
      { type: 'user', name: '用户' },
    ],
    span: 24,
    labelWidth: 100,
  },
])

const treeProps = {
  value: 'id',
  label: 'name',
  children: 'children',
}

const show = ref(false)

const emits = defineEmits<{
  (event: 'onNodeClick', val: Tree): void
}>()

const handleNodeClick = (targe: Tree) => {
  emits('onNodeClick', targe)
}

const onReset = () => {
  form.value = {
    parentId: 1,
    deptId: '',
    name: '',
    roleType: '',
    id: null,
  }
}

const onChangeRole = (data: Tree, type: string) => {
  onReset()
  // buttonRules, rules
  const { parentId, roleType, id, deptId, name } = data

  type == 'add'
    ? (form.value.parentId = +id)
    : Object.assign(form.value, {
        parentId,
        roleType,
        id,
        deptId,
        name,
      })
  console.log(form.value)

  show.value = true
}

const onSubmit = async () => {
  try {
    const { code } = await callApi.post('userRole/addOrEdit', form.value)
    if (code == 200) {
      initRole()
      ElMessage.success('人员更新成功')
    }
  } catch (error) {
    console.log(error)
  }
}

const initRole = async () => {
  try {
    const { data } = await callApi.post('/role/roleList', {
      deptId: storeUser.deptId,
    })
    threeData.value = data
    nextTick(() => {
      treeRef.value.setCurrentKey(data[0].id)
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  initRole()
})
</script>

<style scoped lang="scss">
::v-deep(.el-tree-node__content) {
  height: 38px;
}

::v-deep(.el-tree) {
  border: 1px solid #ebeef5;
}
</style>

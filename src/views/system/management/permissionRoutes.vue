<template>
  <div class="bg-[#FFFFFF] p-10px">
    <div class="flex pb-10px">
      <el-button icon="RefreshRight" type="info" @click=""></el-button>
      <el-button type="primary" icon="Plus" @click="onAddModul('menu', '0')">
        新增模块
      </el-button>
      <!-- <el-button type="primary" icon="Plus" @click="onPage">权限分发</el-button>  -->
    </div>
    <el-table
      :data="routesList"
      style="width: 100%"
      lazy
      row-key="id"
      :header-cell-style="runStyle"
      default-expand-all
      align="center"
      :tree-props="{
        children: 'children',
      }">
      <el-table-column label="路由名称">
        <template #default="{ row }">
          {{ row.title }}
        </template>
      </el-table-column>
      <el-table-column prop="path" label="路由地址" />
      <el-table-column prop="component" label="组件地址" />
      <el-table-column prop="icon" label="图标" width="100">
        <template #default="{ row }">
          <div v-if="row.icon">
            <el-icon :size="24" color="#000">
              <Component :is="row.icon"></Component>
            </el-icon>
          </div>
          <div v-else>---</div>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="类型" />

      <el-table-column label="操作" width="250">
        <template #default="{ row }">
          <el-button
            v-if="row.type != 'button'"
            type="primary"
            icon="Plus"
            @click="onAddModul('childRoute', row.id)"></el-button>
          <el-button
            type="success"
            icon="EditPen"
            @click="onEdit(row)"></el-button>
          <el-button
            v-if="!row.children.length"
            type="danger"
            icon="Delete"
            @click="onDelete(row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      title="添加模块"
      width="40%"
      :before-close="handleClose">
      <div><FormConfig :formItem="formItem" :form="form"></FormConfig></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useTable } from '@/hooks/useList'
// import stortRoute from '@/store/modules/route'
import { user } from '@/pinia/modules/user'
import { ElMessageBox, ElMessage } from 'element-plus'
import FormConfig from '@/components/FormConfig/index.vue'

const route = useRoute()
const useUser = user()
console.log(route)

const routesList = ref([])
const operationType = ref('ADD')
const { runStyle } = useTable()
const form = ref({
  path: '', // 地址
  redirect: null, //重定向
  component: '', // 组件地址
  title: '', //菜单名称
  icon: '', //图标
  affix: 0, // 是否关闭
  type: '', //类型
  hideMenu: 0, //是否显示二级子路由
  isLink: 0, //是否外链
  parentId: '', // 父组件id
  id: null,
})
const formItem = computed(() => {
  return [
    {
      label: '地址',
      key: 'path',
      type: 'input',
      required: true,
      placeholder: '请输入地址',
      span: 12,
    },
    {
      label: '重定向地址',
      key: 'redirect',
      type: 'input',
      required: true,
      placeholder: '请输入重定向地址',
      span: 12,
    },

    {
      label: '组件地址',
      key: 'component',
      type: 'input',
      required: true,
      placeholder: '',
      span: 12,
    },
    {
      label: '标题',
      key: 'title',
      type: 'input',
      required: true,
      placeholder: '',
      span: 12,
    },
    {
      label: '图标',
      key: 'icon',
      type: 'icon',
      required: true,
      placeholder: '',
      span: 12,
    },
    {
      label: '关闭面包屑',
      key: 'affix',
      type: 'switch',
      required: true,
      placeholder: '',
      span: 12,
    },
    {
      label: '类型',
      key: 'type',
      type: 'select',
      options:
        form.value.parentId == '0'
          ? [{ type: 'menu', name: '管理' }]
          : [
              { type: 'childRoute', name: '路由' },
              { type: 'button', name: '按钮' },
            ],
      required: true,
      placeholder: '',
      span: 12,
    },
    {
      label: '不显示路由',
      key: 'hideMenu',
      type: 'switch',
      required: true,
      placeholder: '',
      span: 12,
    },
    {
      label: '是否外链',
      key: 'isLink',
      type: 'switch',
      required: true,
      placeholder: '',
      span: 12,
    },
  ]
})

const dialogVisible = ref(false)

const handleClose = () => {
  dialogVisible.value = false
}
function onEdit(row: any) {
  operationType.value = 'Edit'
  const {
    path,
    redirect = '',
    component,
    title,
    icon,
    affix,
    type,
    hideMenu,
    isLink,
    parentId,
    id,
  } = row

  form.value = {
    path, // 地址
    redirect, //重定向
    component, // 组件地址
    title, //菜单名称
    icon, //图标
    affix, // 是否关闭
    type, //类型
    hideMenu, //是否显示二级子路由
    isLink, //是否外链
    parentId, // 父组件id
    id,
  }
  dialogVisible.value = true
}

function onAddModul(type = 'menu', parentId: string) {
  operationType.value = 'ADD'
  resetFrom()
  form.value.type = type

  form.value.parentId = parentId
  dialogVisible.value = true
}

async function onSubmit() {
  try {
    const url =
      operationType.value === 'ADD' ? '/routes/save' : '/routes/update'
    const { code } = await callApi.post(url, form.value)
    if (code == 200) {
      ElMessage.success('操作成功')
      init()
    } else {
      ElMessage.error('操作失败')
    }

    dialogVisible.value = false
    resetFrom()
  } catch (error) {
    console.log(error)
    ElMessage.error('操作失败')
  }
}

async function onDelete(id: number) {
  try {
    const { code, data } = await callApi.post('/routes/delete', { id })
    if (code == 200) {
      init()
      ElMessage.success('删除成功')
    }
  } catch (error) {
    console.log(error)
  }
}

function onPage() {}

function resetFrom() {
  form.value = {
    path: '', // 地址
    redirect: null, //重定向
    component: '', // 组件地址
    title: '', //菜单名称
    icon: '', //图标
    affix: 0, // 是否关闭
    type: '', //类型
    hideMenu: 0, //是否显示二级子路由
    isLink: 0, //是否外链
    parentId: '', // 父组件id
    id: null,
  }
}

// 一维数组转化为树结构
const permissionTree = (arr: any[], pid: any) => {
  return arr.reduce((res, current) => {
    // const newCurrent = createdRoute(current)
    if (current['parentId'] == pid) {
      current.children = permissionTree(arr, current['id'])
      return res.concat(current)
    }
    return res
  }, [])
}

async function init() {
  try {
    const { data, code } = await callApi.get('/routes/all')

    nextTick(() => {
      routesList.value = permissionTree(data, 0)
    })
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped></style>

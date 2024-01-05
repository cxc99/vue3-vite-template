<template>
  <div class="bg-[#FFFFFF] p-10px">
    <div class="flex pb-10px">
      <el-button icon="RefreshRight" type="info" @click=""></el-button>
      <el-button type="primary" icon="Plus" @click="onAddModul('menu', '0')">
        新增模块
      </el-button>
      <el-button type="primary" icon="Plus" @click="onPage">权限分发</el-button>
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

      <el-table-column label="按钮">
        <template #default="{ row }">
          {{ row.role }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="{ row }">
          <el-button
            type="primary"
            icon="Place"
            @click="onAddModul('childRoute', row.id)"></el-button>
          <el-button
            type="primary"
            icon="Plus"
            @click="onAddModul('childRoute', row.id)"></el-button>
          <el-button
            type="success"
            icon="EditPen"
            @click="onEdit(row)"></el-button>
          <el-button
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
import { storeToRefs } from 'pinia'
import { useTable } from '@/hooks/useList'
// import stortRoute from '@/store/modules/route'
import { user } from '@/pinia/modules/user'
import { ElMessageBox } from 'element-plus'
import FormConfig from '@/components/FormConfig/index.vue'

const router = useRouter()
const useUser = user()
// const { addRoutes } = storeToRefs(stortRoute());

const routesList = ref([])
const operationType = ref('ADD')
const { runStyle } = useTable()

const formItem = ref([
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
    key: 'menuType',
    type: 'select',
    options: [
      { type: 'menu', name: '管理' },
      { type: 'childRoute', name: '路由' },
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
])

const form = ref({
  path: '', // 地址
  redirect: null, //重定向
  component: '', // 组件地址
  title: '', //菜单名称
  icon: '', //图标
  affix: 0, // 是否关闭
  menuType: '', //类型
  hideMenu: 0, //是否显示二级子路由
  isLink: '', //是否外链
  parentid: '', // 父组件id
  id: null,
})

const dialogVisible = ref(false)

const handleClose = () => {
  dialogVisible.value = false
}
function onEdit(row: any) {
  operationType.value = 'Edit'
  const {
    path,
    redirect,
    component,
    title,
    icon,
    affix,
    menuType,
    hideMenu,
    isLink,
    parentid,
    id,
  } = row.meta
  form.value = {
    path, // 地址
    redirect, //重定向
    component, // 组件地址
    title, //菜单名称
    icon, //图标
    affix, // 是否关闭
    menuType, //类型
    hideMenu, //是否显示二级子路由
    isLink, //是否外链
    parentid, // 父组件id
    id,
  }
  dialogVisible.value = true
}

function onAddModul(type = 'menu', parentid: string) {
  operationType.value = 'ADD'
  resetFrom()
  form.value.menuType = type
  if (type === 'menu') form.value.component = '/system/home'
  form.value.parentid = parentid
  dialogVisible.value = true
}

async function onSubmit() {
  try {
    const url =
      operationType.value === 'ADD' ? '/admin/menu/add' : '/admin/menu/update'
    const { code } = await callApi.post(url, form.value)
    if (code == 0) {
      init()
    }

    dialogVisible.value = false
    resetFrom()
  } catch (error) {
    console.log(error)
  }
}

async function onDelete(id: number) {
  try {
    const { code, data } = await callApi.get('/admin/menu/remove', { id })
    if (code == 0) {
      /**暂时想不到好办法,只能刷新页面来解决删除路由之后的后遗症 */
      router.go(0)
    }
  } catch (error) {
    console.log(error)
  }
}

function onPage() {
  // router.push('/admin/dispath');
}

function resetFrom() {
  form.value = {
    path: '', // 地址
    redirect: null, //重定向
    component: '', // 组件地址
    title: '', //菜单名称
    icon: '', //图标
    affix: 0, // 是否关闭
    menuType: '', //类型
    hideMenu: 0, //是否显示二级子路由
    isLink: '', //是否外链
    parentid: '', // 父组件id
    id: null,
  }
}

const createdRoute = (item: {
  affix?: '' | undefined
  component?: '' | undefined
  hideMenu?: '' | undefined
  icon?: '' | undefined
  id?: '' | undefined
  isLink?: '' | undefined
  parentId?: '' | undefined
  path?: '' | undefined
  redirect?: '' | undefined
  title?: '' | undefined
  type?: '' | undefined
  children?: any[]
}) => {
  const {
    affix = '',
    component = '',
    hideMenu = '',
    icon = '',
    id = '',
    isLink = '',
    parentId = '',
    path = '',
    redirect = '',
    title = '',
    type = '',
    children = [],
  } = item

  return {
    id,
    parentId,
    path,
    redirect,
    title,
    type,
    component,
    icon,
    affix,
    hideMenu,
    isLink,
    children,
  }
}

// 一维数组转化为树结构
const permissionTree = (arr: any[], pid: any) => {
  return arr.reduce((res, current) => {
    const newCurrent = createdRoute(current)
    if (newCurrent['parentId'] == pid) {
      newCurrent.children = permissionTree(arr, newCurrent['id'])
      return res.concat(newCurrent)
    }
    return res
  }, [])
}

async function init() {
  try {
    const { data, code } = await callApi.post('/userRole/routes', {
      deptId: useUser.deptId,
    })

    routesList.value = permissionTree(data, 0)

  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped></style>

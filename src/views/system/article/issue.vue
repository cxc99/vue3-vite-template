<template>
  <div>
    <FormConfig ref="formConfig" :formItem="formItem" :form="form">
      <template #footer>
        <el-form-item label="内容:" label-width="150">
          <div style="border: 1px solid #ccc">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode" />
            <Editor
              style="height: 400px; overflow-y: hidden"
              v-model="form.content"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated" />
          </div>
        </el-form-item>

        <el-form-item label-width="150">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </template>
    </FormConfig>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { user } from '@/pinia/modules/user'
import FormConfig from '@/components/FormConfig/index.vue'

type InsertFnType = (url: string, alt?: string, href?: string) => void

const route = useRoute()
const useUser = user()
const editorRef = shallowRef()
const mode = ref('default')

const formConfig = ref(null)

const form = ref({
  title: '',
  content: '',
  userName: useUser.nickName,
  id: null as string | null,
  imgList: [] as any,
  subhead: '',
  tag: 'javaSrcipt',
})

const formItem = ref([
  {
    label: '标题',
    key: 'title',
    type: 'input',
    required: true,
    placeholder: '',
    span: 8,
  },
  {
    label: '标签',
    key: 'tag',
    type: 'select',
    required: true,
    placeholder: '',
    options: [
      { type: 'javaSrcipt', name: 'javaSrcipt' },
      { type: 'css', name: 'css' },
      { type: 'nest', name: 'nest' },
      { type: 'vue', name: 'vue' },
      { type: 'react', name: 'react' },
      { type: '其他', name: '其他' },
    ],
    span: 8,
  },
  {
    label: '简述',
    key: 'subhead',
    type: 'textarea',
    required: true,
    placeholder: '',
    span: 17,
  },
  {
    label: '标题图片',
    key: 'imgList',
    type: 'uploade',
    required: true,
    placeholder: '',
    span: 24,
  },
])
// useUser.nickName
const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      async customUpload(file: File, insertFn: InsertFnType) {
        try {
          const formData = new FormData()
          formData.append('file', file)
          const { data, code } = await callApi.post(
            '/blogsArticle/upload',
            formData,
          )

          if (code == 200) {
            ElMessage({ type: 'success', message: '上传成功' })

            insertFn(data.url)
          }
        } catch (error) {
          console.log(error)
        }
      },
    },
  },
}

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const onSubmit = async () => {
  try {
    const url = form.value.id
      ? '/blogsArticle/update/article'
      : '/blogsArticle/create/article'

    const { data, code } = await callApi.post(url, {
      ...form.value,
      imgList: JSON.stringify(form.value.imgList),
    })
    code == 200 && ElMessage({ type: 'success', message: '发布成功' })
  } catch (error) {}
}

const reFindDetails = async () => {
  try {
    const { data } = await callApi.get('/blogsArticle/info', {
      id: route.query.id,
    })

    form.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
  form.value.id = String(route.query.id) || null

  route.query.id
    ? reFindDetails()
    : (form.value = {
        title: '',
        content: '',
        userName: useUser.nickName,
        id: null,
        imgList: [],
        subhead: '',
        tag: 'javaSrcipt',
      })
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>

<style lang="scss" scoped></style>

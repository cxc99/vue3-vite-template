<template>
  <div>
    <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
      <slot name="top"></slot>
      <el-row>
        <el-col
          v-for="item in formItem"
          :key="item.key"
          :span="item.span || 24">
          <el-form-item
            :label="item.label + ':'"
            :prop="item.key"
            label-width="150">
            <div v-if="item.type === 'input'" class="w-full flex">
              <el-input v-model="form[item.key]" :disabled="item.disabled" />
              <span class="text-center">
                {{ item.unit || '' }}
              </span>
            </div>
            <div v-if="item.type === 'number'" class="w-full flex">
              <el-input
                type="number"
                v-model.number="form[item.key]"
                :class="{ 'w-1/2': item.child && form[item.key] }" />
              <span v-if="item.unit" class="w-50px text-center">
                {{ item.unit || '' }}
              </span>

              <!-- item.child && form[item.key]  判断上级是否存在值 并且是否有子集child  -->
              <el-form-item
                v-if="item.child && form[item.key]"
                :label="item.child.label + ':'"
                :prop="item.child.key"
                class="w-full">
                <el-input
                  :type="item.child.type"
                  v-model="form[item.child.key]" />
                <span class="w-50px text-center">
                  {{ item.child.unit || '' }}
                </span>
              </el-form-item>
            </div>
            <div v-if="item.type === 'select'">
              <el-select
                v-model="form[item.key]"
                :placeholder="item.placeholder || ''"
                :disabled="item.disabled">
                <el-option
                  v-for="group in item.options"
                  :key="group.type"
                  :label="group.name"
                  :value="group.type" />
              </el-select>
            </div>

            <el-radio-group
              v-if="item.type === 'radio'"
              v-model="form[item.key]">
              <el-radio
                v-for="group in item.options"
                :key="group.type"
                :label="group.type">
                {{ group.name }}
              </el-radio>
            </el-radio-group>

            <el-date-picker
              v-if="item.type === 'date'"
              v-model="form[item.key]"
              type="datetime"
              placeholder="请选择时间"
              value-format="YYYY-MM-DD HH:mm:ss"
              format="YYYY-MM-DD HH:mm:ss"
              :disabledDate="(time:any) => disabledDateFun(time, item.key)" />
            <!-- @change="status => onHandelSwith(+status, item.itemCode)"  -->

            <div v-if="item.type === 'switch'">
              <el-switch
                v-model="form[item.key]"
                :inactive-value="0"
                :active-value="1" />

              <span v-if="item.note" class="text-blue-400 text-12px pl-12px">
                {{ item.note }}
              </span>
            </div>

            <div v-if="item.type === 'uploade'">
              <div class="uploade">
                <el-upload
                  v-loading.fullscreen.lock="loading"
                  element-loading-text="图片上传中..."
                  v-model:file-list="form[item.key]"
                  :http-request="(file: any) => requset(file, form[item.key])"
                  action="#"
                  list-type="picture-card"
                  :onChange="handleOnChange"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="(file: any) => handleRemove(file, form[item.key])">
                  <el-icon><Plus /></el-icon>
                </el-upload>
              </div>
              <div v-if="item.note">{{ item.note }}</div>
            </div>

            <div v-if="item.type === 'icon'">
              <div>
                <el-popover
                  placement="bottom"
                  trigger="click"
                  width="300"
                  v-model:visible="visible">
                  <template #reference>
                    <div class="flex items-center">
                      <el-input
                        v-if="!form[item.key]"
                        v-model="form[item.key]"
                        :disabled="item.disabled" />
                      <el-icon v-else style="font-size: 20px">
                        <Component :is="form[item.key]"></Component>
                      </el-icon>
                    </div>
                  </template>
                  <div class="overflow-auto h-300px">
                    <el-icon
                      v-for="targe in ElementPlusIconsVue"
                      :key="targe.name"
                      style="font-size: 20px"
                      @click="setIcon(targe, item.key)">
                      <Component :is="targe"></Component>
                    </el-icon>
                  </div>
                </el-popover>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <slot name="footer"></slot>
    </el-form>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
interface Formitem {
  label: string
  key: string
  type: string
  required: boolean
  placeholder?: string
  options?: { type: string; name: string }[]
  unit?: string
  prop?: string
  span?: number
  child?: Formitem
  disabled?: boolean
  note?: string
}

interface Prop {
  formItem: Formitem[] | Record<string, any>
  form: Record<string, any>
  rules?: any
}

const route = useRoute()

const visible = ref(false)
const loading = ref(false)
const props = withDefaults(defineProps<Prop>(), {
  formItem: () => {
    return [
      {
        label: '活动名称',
        key: 'activityName',
        type: 'input',
        required: true,
        placeholder: '',
        options: [{ type: 1, name: '1' }],
        unit: '元',
        span: 24,
      },
    ]
  },
  form: () => {
    return { activityName: '' }
  },
  rules: {},
})
const formRef = ref<any>(null)
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
function disabledDateFun(time: { getTime: () => number }, key: string) {
  // 还有其他配置 《后续增加》
  if (key === 'endTime') {
    return time.getTime() < new Date(props.form.startTime).getTime()
  }
}

const onSubmit = async () => {
  return await formRef.value.validate((valid: any) => {
    return !!valid
  })
}

const handlePictureCardPreview: UploadProps['onPreview'] = uploadFile => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

async function requset(file: any, value: any) {
  const formData = new FormData()
  formData.append('file', file.file)

  try {
    const { data, code } = await callApi.post('/blogsArticle/upload', formData)
    console.log(value)
    if (code == 200) {
      value.pop() // 删除本地数据
      value.push(data) // 添加线上数据
    }
  } catch (error) {
    console.log(error)
  }
}

const handleRemove = (uploadFile: UploadProps, value: any) => {
  console.log(uploadFile, value)
}

const handleOnChange = (file: { status: string }) => {
  loading.value = true

  if (file.status == 'success') {
    loading.value = false
  } else {
    setTimeout(() => {
      loading.value = false
    }, 2000)
  }
}

//给icon绑定的点击事件
function setIcon(icon: any, key: string) {
  props.form[key] = icon.name
  visible.value = false
}

defineExpose({
  onSubmit,
})
</script>

<style scoped lang="scss">
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 125px;
  height: 125px;
  text-align: center;
}
</style>

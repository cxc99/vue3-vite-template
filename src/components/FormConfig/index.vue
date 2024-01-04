<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
    <slot name="top"></slot>
    <el-row>
      <el-col v-for="item in formItem" :key="item.key" :span="item.span || 24">
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

          <el-radio-group v-if="item.type === 'radio'" v-model="form[item.key]">
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
                :onChange="handleOnChange"
                :show-file-list="false">
                <img
                  v-if="form[item.key]?.length"
                  :src="form[item.key][0].url"
                  class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
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
</template>

<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
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

async function requset(file: any, value: any) {
  const formData = new FormData()
  formData.append('file', file.file)

  if (route.path == '/mallMmanagementSubPrize') {
    formData.set('itemCode', String(route.query.activityCode))
  } /* 奖品子路由的时候特殊添加处理**/

  try {
    const { data } = await callApi.post('/qiniu/upload', formData)
    value[0].url = data
  } catch (error) {
    console.log(error)
  }
}

const handleRemove = () => {
  console.log(124)
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
.uploade {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  width: 125px;
  height: 125px;
  &:hover {
    border-color: var(--el-color-primary);
  }
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 125px;
  height: 125px;
  text-align: center;
}
</style>

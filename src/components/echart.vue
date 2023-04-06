<template>
  <div :id="props.id" :class="props.class"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
interface Props {
  id: string // 利用TS：限定父组件传 either 的值
  class?: string
  option?: any
}

const props = withDefaults(defineProps<Props>(), { id: 'echar' })

const id = ref()
onMounted(() => {
  //
  id.value = document.getElementById(props.id)
  echarts.init(id.value).setOption(props.option)
})

watch(
  () => props.option,
  () => {
    echarts.init(id.value).setOption(props.option)
  },
  { deep: true },
)
</script>

<style lang="scss" scoped></style>

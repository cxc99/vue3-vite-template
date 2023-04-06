<template>
  <div class="appearance" v-for="item in list" :key="item.title">
    <div class="text-40px mb-10px">{{ item.title }}</div>
    <CountTo
      class="text-40px text-yellow-500"
      :start-val="0"
      :end-val="item.count"
      :duration="3000"></CountTo>
  </div>
</template>

<script setup lang="ts">
import { CountTo } from 'vue3-count-to'

defineComponent({ CountTo })

const timer = ref()
const list = reactive([
  { title: '全年人数', count: 88888 },
  { title: '本月人数', count: 1314 },
  { title: '本日人数', count: 520 },
])

timer.value && clearInterval(timer.value)

timer.value = setInterval(() => {
  list[0].count = +(Math.random() * 88888).toFixed(2)
  list[1].count = +(Math.random() * 1314).toFixed(2)
  list[2].count = +(Math.random() * 520).toFixed(2)
}, 10000)

onUnmounted(() => {
  timer.value && clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.appearance {
  border-radius: 8px;
  text-align: center;
}
</style>

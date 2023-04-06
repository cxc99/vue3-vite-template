<template>
  <div class="warning">
    <vue3-seamless-scroll
      hover
      wheel
      :list="list"
      :count="10"
      :step="0.5"
      :copyNum="0">
      <div
        class="warning__item"
        v-for="(item, index) in list"
        :key="index"
        :style="{ color: `${item.color}` }">
        <div>{{ item.postion }}</div>
        <div>{{ item.info }}</div>
        <div>{{ item.date }}</div>
      </div>
    </vue3-seamless-scroll>
  </div>
</template>

<script setup lang="ts">
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

import dayjs from 'dayjs'
defineComponent({ Vue3SeamlessScroll })
const list = reactive([
  {
    info: '有人员进入危险区域1',
    color: 'red',
    postion: '杭州市',
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    info: '六楼应急照明设备发生故障2',
    color: 'orange',
    postion: '温州市',
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    info: '有人员进入危险区域3',
    color: 'red',
    postion: '杭州市',
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    info: '六楼应急照明设备发生故障4',
    color: 'orange',
    postion: '杭州市',
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    info: '有人员进入危险区域5',
    color: 'red',
    postion: '杭州市',
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    info: '有人员进入危险区域6',
    color: 'red',
    postion: '杭州市',
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    info: '六楼应急照明设备发生故障7',
    color: 'orange',
    postion: '杭州市',
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    info: '有人员进入危险区域8',
    color: 'red',
    postion: '杭州市',
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    info: '六楼应急照明设备发生故障9',
    color: 'orange',
    postion: '杭州市',
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    info: '有人员进入危险区域10',
    color: 'red',
    postion: '杭州市',
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
])
</script>

<style lang="scss" scoped>
.warning {
  overflow: hidden;
  height: 100%;
  padding: 20px 20px 20px 40px;
  &__item {
    display: flex;
    justify-content: space-between;
    // width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    padding: 10px 0px;
    &:hover {
      color: rgb(0, 145, 255) !important;
      cursor: pointer;
    }
  }
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>

<template>
  <div class="home">
    <div class="flex">
      <c-button
        lable="个人简介"
        class="w-100px h-40px mr-20px"
        @click="onPage"></c-button>
      <c-button
        lable="后台"
        class="w-100px h-40px mr-20px"
        @click="onPage('/loign')"></c-button>
      <c-button
        lable="mapbox-gl"
        class="w-110px h-40px mr-20px"
        @click="onPage('/mapbox')"></c-button>
      <c-button
        lable="大屏"
        class="w-100px h-40px mr-20px"
        @click="onPage('/dataScreen')"></c-button>
      <c-button
        lable="three"
        class="w-100px h-40px"
        @click="onPage('/three')"></c-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import CButton from '@/components/CButton.vue'

defineComponent({
  CButton,
})
const router = useRouter()

function onPage(url = '/') {
  router.push(url)
}

async function textApi() {
  try {
    const data = await callApi.get('/search/users2', {})
    console.log(data)
  } catch (error) {
    console.log(error, '报错拉')
  }
}

async function getUserInfo() {
  try {
    const data = await callApi.get('/userInfo', { ce: '123123' })
    console.log(data)
  } catch (error) {
    console.log(error, '报错拉')
  }
}
// 调用本地数据库的 接口
async function reFindsheet() {
  try {
    const data = await callApi.get('/sheet')
    console.log(data)
  } catch (error) {
    console.log(error, '报错拉')
  }
}
// userInfo
onMounted(() => {
  // textApi()
  // getUserInfo()
  // reFindsheet()
})
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}
</style>

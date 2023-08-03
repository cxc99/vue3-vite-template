<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="home__title">
          <div>自定义后台</div>

          <div class="home__personage">
            <el-avatar
              :size="40"
              src="https://show.cardwinner.com/hz/hdzs/ICBC_HZ_SBCJ/assets/egg.033c1c10.png" />

            <el-icon :size="15" class="ml-10px"><CaretBottom /></el-icon>
          </div>
        </div>
      </el-header>
      <el-container>
        <h-aside></h-aside>
        <el-main>
          <div class="home__main">
            <div class="p-20px">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item
                  v-for="item in breadcrumbList"
                  :key="item.path"
                  :to="{ path: item.path }">
                  {{ item.meta.title }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import HAside from './components/h-aside.vue'

defineComponent({
  HAside,
})

// 面包屑导航功能
const route = useRoute()
const breadcrumbList: Record<string, any> = ref([])

const caleBreadcrumb = () => {
  breadcrumbList.value = route.matched.filter(
    item => item.meta && item.meta.title,
  )
  // console.log(breadcrumbList, 23323)
}

watch(
  () => route.path, // 也可以直接写 route ; 即  () => route.path  替换成 route
  () => {
    // console.log(route.matched)

    caleBreadcrumb()
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
.home {
  &__title {
    width: 100%;
    height: 100%;
    // height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 157, 255, 0.439);
    padding: 0px 50px;
  }

  &__main {
    height: calc(100vh - 90px);
    background: rgba(225, 0, 255, 0.049);
  }

  &__personage {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  :deep(.el-header) {
    padding: 0px;
    // height: 100px;
  }
  :deep(.el-main) {
    padding: 10px;
  }
}
</style>

<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="home__title">
          <div>浅夏的星球后台</div>

          <div class="home__personage">
            <el-dropdown>
              <div class="flex items-center">
                <el-avatar :size="40" :src="imgUrl" />
                <span class="px-5px">{{ useUser.nickName }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <HAside></HAside>
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

            <el-config-provider :locale="zhCn">
              <RouterView class="" v-slot="{ Component }">
                <transition name="fade">
                  <component :is="Component" />
                </transition>
              </RouterView>
            </el-config-provider>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
//@ts-nocheck
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import HAside from './components/HAaside.vue'
import { user } from '@/pinia/modules/user'
// 面包屑导航功能
const route = useRoute()

const router = useRouter()
const useUser = user()
const breadcrumbList: Record<string, any> = ref([])

const imgUrl = new URL(`@/assets/img/tx1.jpg`, import.meta.url).href

const logout = () => {
  localStorage.clear()
  router.push('/login')
}

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
    // background: rgba(225, 0, 255, 0.049);
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

.fade-enter-from {
  /* 进入时的透明度为0 和 刚开始进入时的原始位置通过active透明度渐渐变为1 */
  opacity: 0;
  transform: translateX(-100%);
}

.fade-enter-to {
  /*定义进入完成后的位置 和 透明度 */
  transform: translateX(0%);
  opacity: 1;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s ease-out;
}

.fade-leave-from {
  /* 页面离开时一开始的css样式,离开后为leave-to，经过active渐渐透明 */
  transform: translateX(0%);
  opacity: 1;
}

.fade-leave-to {
  /* 这个是离开后的透明度通过下面的active阶段渐渐变为0 */
  transform: translateX(100%);
  opacity: 0;
}
</style>

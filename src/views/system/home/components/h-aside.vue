<template>
  <el-aside width="200px">
    <div class="w-full h-full menu">
      <el-row>
        <el-col>
          <el-menu
            :default-active="defaultActive"
            class="w-full"
            router
            @open="handleOpen"
            @close="handleClose">
            <div v-for="(item, index) in Menu" :key="index">
              <el-sub-menu v-if="item.children?.length" :index="item.path">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>{{ item.title }}</span>
                </template>

                <el-menu-item
                  v-for="(group, groupIndex) in item.children"
                  :key="groupIndex"
                  :route="group"
                  :index="group.path">
                  {{ group.title }}

                  <!-- <el-menu-item
                    v-for="(targe, targeIndex) in group.children"
                    :key="targeIndex"
                    :route="targe"
                    :index="targe.path"></el-menu-item> -->
                </el-menu-item>
              </el-sub-menu>

              <el-menu-item v-else :key="index" :index="item.path">
                <el-icon><icon-menu /></el-icon>
                <span>{{ item.title }}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </el-aside>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { menu } from '../mock/menu'

const Menu = reactive(menu)

const route = useRoute()

// const router = useRouter() 方法
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, 1, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, 2, keyPath)
}

const defaultActive = ref(window.location.hash.slice(1))

watch(
  () => route.path,
  (newVal, oldVal) => {
    defaultActive.value = window.location.hash.slice(1)
  },
  {
    deep: true,
  },
)
</script>

<style lang="scss" scoped>
.menu {
  border-right: 1px solid #e5e5e5ff;
}

:deep(.el-menu) {
  border-right: none;

  text-align: center;
}
</style>

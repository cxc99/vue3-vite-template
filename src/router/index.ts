import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { system } from './system'
import { mapbox } from './mapbox'
import { three } from './three'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/dataScreen',
    component: () => import('../views/dataScreen/index.vue'),
  },
  ...system,
  ...mapbox,
  ...three,
]

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
  // ...
  console.log('路由前置守护')
  console.log(router.getRoutes())

  if (to.meta.title) {
    window.document.title = to.meta.title
  }

  if (to.meta.verification) {
    const token = localStorage.getItem('token')
    if (!token) {
      // router.push({ name: 'login' })
    }
  }
  // 返回 false 以取消导航
  next()
})

router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      // await askForCameraPermission()
    } catch (error) {
      console.log(error)
    }
  }
})

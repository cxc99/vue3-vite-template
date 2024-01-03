import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  createWebHistory,
} from 'vue-router'
import { system } from './system'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/loign',
    name: 'Login',
    component: () => import('../views/system/login.vue'),
    meta: { title: '登入' },
  },

  ...system,
]

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory('/admin'),
  routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
  // ...
  console.log('路由前置守护')
  console.log(router.getRoutes())

  if (to.meta.title) {
    window.document.title = to.meta.title
  }

  const whileList = ['/', '/loign']
  if (whileList.includes(to.path)) return next()

  const token = localStorage.getItem('token')

  if (!token) {
    router.push({ name: 'Login' })
    return next()
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

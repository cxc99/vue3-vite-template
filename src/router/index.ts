import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  createWebHistory,
} from 'vue-router'
import { system } from './system'
import { permissionTree } from '@/utils/threeRoutes'
export const routes: Array<RouteRecordRaw> = [
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
  {
    path: '/system/home',
    name: 'System',
    component: () => import('../views/system/home/index.vue'),
    meta: { title: '首页' },
  },
  // {
  //   path: '/layout',
  //   name: 'Layout',
  //   component: () => import('../views/Layout/index.vue'),
  //   meta: { title: 'Layout' },
  // },

  ...system,
]

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory('/admin'),
  routes, // `routes: routes` 的缩写
})

const createdRoute = () => {
  const storeRoute = localStorage.getItem('storeRoute') || ''

  if (storeRoute) {
    const list = JSON.parse(storeRoute).routes

    const treeRouter = permissionTree(list, '0')

    treeRouter.forEach((item: any) => {
      router.addRoute('System', item)
    })
  }
}

createdRoute()

router.beforeEach((to, from, next) => {
  // ...
  console.log('路由前置守护')
  // console.log(router.getMenu())

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

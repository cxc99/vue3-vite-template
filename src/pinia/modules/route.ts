import { defineStore } from 'pinia'
import { router, routes } from '@/router/index'

interface row {
  affix?: '' | undefined
  component?: any
  hideMenu?: '' | undefined
  icon?: '' | undefined
  id?: '' | undefined
  isLink?: '' | undefined
  parentId?: '' | undefined
  path?: '' | undefined
  name?: '' | undefined
  redirect?: '' | undefined
  title?: '' | undefined
  type?: '' | undefined
}

interface ThreeRouter extends row {
  children?: ThreeRouter[]
  meta?: row
}

interface RouteInfo {
  routes: row[]
}

// 一维数组转化为树结构
const permissionTree = (arr: ThreeRouter[], pid: string) => {
  const modules = import.meta.glob('@/views/**/*.vue')
  return arr.reduce((res: ThreeRouter[], current: ThreeRouter) => {
    const filePath = modules[`/src/views/${current.component}.vue`]
    const newRoute = {
      path: current.path,
      name: current.name,
      component: filePath,
      meta: {
        title: current.title,
        icon: current.icon,
        hideMenu: current.hideMenu,
        isLink: current.isLink,
        redirect: current.redirect,
        affix: current.affix,
        type: current.type,
      },
      title: current.title,
      id: current.id,
      parentId: current.parentId,
      children: current.children,
    }
    if (newRoute['parentId'] == pid) {
      const targe = newRoute['id'] as string
      newRoute.children = permissionTree(arr, targe)
      return res.concat(newRoute)
    }
    return res
  }, [])
}

export const routeStore = defineStore('storeRoute', {
  state: (): RouteInfo => ({
    routes: [],
  }),

  getters: {
    getRoutes(): any {
      return permissionTree(this.routes, '0')
    },
  },

  actions: {
    SET_THREE_ROUTER(threeRouter: ThreeRouter[]) {
      this.routes = threeRouter
    },

    INIT_ROUER() {
      this.getRoutes.forEach((item: any) => {
        router.addRoute('System', item)
      })
    },
    REMOVE_ROUER() {},
  },

  persist: true,
})

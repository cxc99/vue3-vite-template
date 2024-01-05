import { defineStore } from 'pinia'
import { router } from '@/router/index'

import { Row, ThreeRouter, permissionTree } from '@/utils/threeRoutes'

interface RouteInfo {
  routes: Row[]
}

export const routeStore = defineStore('storeRoute', {
  state: (): RouteInfo => ({
    routes: [],
  }),

  getters: {
    getMenu(): ThreeRouter[] {
      return permissionTree(this.routes, '0')
    },
  },

  actions: {
    SET_THREE_ROUTER(threeRouter: ThreeRouter[]) {
      this.routes = threeRouter
    },

    INIT_ROUER() {
      this.getMenu.forEach((item: any) => {
        router.addRoute('System', item)
      })
    },
  },

  persist: true,
})

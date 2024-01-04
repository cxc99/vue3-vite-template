import { defineStore } from 'pinia'
const router = useRouter()
interface row {
  affix?: '' | undefined
  component?: '' | undefined
  hideMenu?: '' | undefined
  icon?: '' | undefined
  id?: '' | undefined
  isLink?: '' | undefined
  parentId?: '' | undefined
  path?: '' | undefined
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
  threeRouter: ThreeRouter[]
}

export const storeRoute = defineStore('route', {
  state: (): RouteInfo => ({
    routes: [],
    threeRouter: [],
  }),

  actions: {
    SET_THREE_ROUTER(threeRouter: ThreeRouter[]) {
      this.threeRouter = threeRouter
    },
  },

  //   persist: true,
})

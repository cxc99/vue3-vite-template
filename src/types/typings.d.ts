import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题 */
    title: string
  }
}

declare global {
  interface Window {
    WWOpenData: {
      bind: (el: Element) => void
      on: () => void
      off: () => void
    }

    VConsole: any
  }
}

import { createPinia, defineStore } from 'pinia'
import { user } from './modules/user'
// import { useSystemStore } from './modules/system'

export const pinia = createPinia()
export { user }
export const useStore = defineStore('main', {
  state: () => ({
    name: 'cxc',
    currentUsertype: 1,
  }),

  getters: {
    isTeacher(state) {
      return state.currentUsertype === 1
    },
  },
})

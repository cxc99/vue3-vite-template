import { defineStore } from 'pinia'

interface User {
  name: string
}

export const user = defineStore('user', {
  state: (): User => ({
    name: 'user',
  }),
})

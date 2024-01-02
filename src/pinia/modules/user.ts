import { defineStore } from 'pinia'

interface User {
  avatar: string
  delFlag: string
  deptId: string
  email: string
  loginDate: null | string
  nickName: string
  phonenumber: string
  remark: null | string
  sex: string
  status: string
  token: string
  userId: string
  userName: string
  userType: string
}

export const user = defineStore('user', {
  state: (): User => ({
    avatar: '',
    delFlag: '',
    deptId: '',
    email: '',
    loginDate: null,
    nickName: '',
    phonenumber: '',
    remark: null,
    sex: '',
    status: '',
    token: '',
    userId: '',
    userName: '',
    userType: '',
  }),

  actions: {
    SET_USER(user: User) {
      for (const key in user) {
        if (Object.prototype.hasOwnProperty.call(user, key)) {
          const targe = key as keyof User
          this[targe] = user[targe] as string
        }
      }
    },
  },

  persist: true,
})

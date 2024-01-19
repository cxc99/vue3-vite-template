import { defineStore } from 'pinia'

export interface UserInfo {
  avatar: string
  delFlag: string
  deptId: string
  email: string
  loginDate: null | string
  nickName: string
  remark: null | string
  sex: string
  status: string
  token: string
  userId: string
  userName: string
  userType: string
  roles: any
}

export const user = defineStore('user', {
  state: (): UserInfo => ({
    avatar: '',
    delFlag: '',
    deptId: '',
    email: '',
    loginDate: null,
    nickName: '',
    remark: null,
    sex: '',
    status: '',
    token: '',
    userId: '',
    userName: '',
    userType: '',
    roles: {},
  }),

  actions: {
    SET_USER(user: UserInfo) {
      for (const key in user) {
        if (Object.prototype.hasOwnProperty.call(user, key)) {
          const targe = key as keyof UserInfo
          this[targe] = user[targe] as string
        }
      }
    },
  },

  persist: true,
})

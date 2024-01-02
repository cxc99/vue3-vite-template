import { defineStore } from 'pinia'

interface User {
  avatar: ''
  createBy: ''
  createTime: null
  delFlag: '0'
  deptId: '103'
  email: ''
  loginDate: null
  loginIp: '127.0.0.1'
  nickName: '程'
  password: '123456'
  phonenumber: '13175120575'
  remark: null
  sex: '0'
  status: '0'
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDAiLCJ1c2VybmFtZSI6IjEwOTAxMTM0OTkiLCJwaG9uZW51bWJlciI6IjEzMTc1MTIwNTc1IiwiaWF0IjoxNzAzOTQxNjcyfQ.6bYzKHXaONTSjpqZWrDUHxppFzCU8TXF8_Dzr4xJUO4'
  updateBy: ''
  updateTime: null
  userId: '100'
  userName: '1090113499'
  userType: '00'
}

export const user = defineStore('user', {
  state: (): User => ({
    avatar: '',
    createBy: '',
    createTime: null,
    delFlag: '0',
    deptId: '103',
    email: '',
    loginDate: null,
    loginIp: '127.0.0.1',
    nickName: '程',
    password: '123456',
    phonenumber: '13175120575',
    remark: null,
    sex: '0',
    status: '0',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDAiLCJ1c2VybmFtZSI6IjEwOTAxMTM0OTkiLCJwaG9uZW51bWJlciI6IjEzMTc1MTIwNTc1IiwiaWF0IjoxNzAzOTQxNjcyfQ.6bYzKHXaONTSjpqZWrDUHxppFzCU8TXF8_Dzr4xJUO4',
    updateBy: '',
    updateTime: null,
    userId: '100',
    userName: '1090113499',
    userType: '00',
  }),
})

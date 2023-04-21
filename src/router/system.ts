export const system = [
  {
    path: '/loign',
    component: () => import('../views/system/login.vue'),
    meta: { title: '登入' },
  },
  {
    path: '/system/home',
    component: () => import('../views/system/home/index.vue'),
    meta: { title: '首页' },
    children: [
      {
        path: '',
        meta: { title: '内容1' },
        component: () => import('../views/system/home/dome/index.vue'),
      },
      {
        path: '/management',
        meta: { title: '权限管理' },
        children: [
          {
            path: 'personnel',
            meta: { title: '成员管理' },
            component: () => import('../views/system/management/personnel.vue'),
          },
        ],
        component: () => import('../views/system/management/index.vue'),
      },
    ],
  },
]

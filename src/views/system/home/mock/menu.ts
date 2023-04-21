export const menu = [
  {
    title: '首页',
    path: '/system/home',
    children: [{ path: '/system/home', title: '内容1' }],
    meta: { title: '内容1' },
  },
  {
    title: '权限管理',
    path: '/system/home/management',
    children: [
      {
        path: '/management',
        title: '权限管理',
        children: [
          {
            path: '/personnel',
            meta: { title: '成员管理' },
          },
        ],
      },
      // { path: '/personnel', title: '成员管理' },
    ],
    meta: { title: '权限管理' },
  },
]

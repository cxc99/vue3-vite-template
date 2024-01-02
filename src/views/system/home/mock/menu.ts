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
            title: '成员管理',
            path: '/personnel',
            meta: { title: '成员管理' },
          },
          {
            title: '成员管理',
            path: '/system/home',
            meta: { title: '成员管理' },
          },
        ],
      },
    ],
    meta: { title: '权限管理' },
  },

  {
    title: '文章',
    path: '/article',
    children: [
      { path: '/article/table', title: '文章列表' },
      { path: '/article/issue', title: '文章发布' },
    ],
  },
]

export interface Row {
  affix?: '' | undefined
  component?: any
  hideMenu?: '' | undefined
  icon?: '' | undefined
  id?: '' | undefined
  isLink?: '' | undefined
  parentId?: '' | undefined
  path?: '' | undefined
  name?: '' | undefined
  redirect?: '' | undefined
  title?: '' | undefined
  type?: '' | undefined
}

export interface ThreeRouter extends Row {
  children?: ThreeRouter[]
  meta?: Row
}

// 一维数组转化为树结构
export const permissionTree = (arr: ThreeRouter[], pid: string) => {
  const modules = import.meta.glob('@/views/**/*.vue')
  return arr.reduce((res: ThreeRouter[], current: ThreeRouter) => {
    const filePath = modules[`/src/views/${current.component}.vue`]
    const newRoute = {
      path: current.path,
      name: current.name,
      component: filePath,
      meta: {
        title: current.title,
        icon: current.icon,
        hideMenu: current.hideMenu,
        isLink: current.isLink,
        redirect: current.redirect,
        affix: current.affix,
        type: current.type,
      },
      title: current.title,
      id: current.id,
      parentId: current.parentId,
      children: current.children,
    }
    if (newRoute['parentId'] == pid) {
      const targe = newRoute['id'] as string
      newRoute.children = permissionTree(arr, targe)
      return res.concat(newRoute)
    }
    return res
  }, [])
}

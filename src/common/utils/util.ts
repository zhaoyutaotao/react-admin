/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns string[]
 */
export const getOpenKeys = (path: string) => {
  const paths = path.split('/').filter((item) => !!item)
  const pathArr: string[] = []
  paths
    .map((item) => `/${item}`)
    .reduce((prev, cur) => {
      pathArr.push(prev + cur)
      return prev + cur
    }, '')
  return pathArr
}

/**
 * @description 根据路径查找匹配的菜单对象
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns 匹配的路由对象，未找到则返回空对象
 */
export const findMenuByPath = (path: string, routes: any): any => {
  for (const item of routes) {
    if (item.key === path) return item
    if (item.children) {
      const found = findMenuByPath(path, item.children)
      if (Object.keys(found).length) return found
    }
  }
  return {}
}

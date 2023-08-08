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
	return pathArr;
};
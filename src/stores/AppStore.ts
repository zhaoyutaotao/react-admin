import type { TabsProps } from 'antd'
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import { menus } from 'src/pages/System/Menu/data'

export interface ThemeConfig {
  /**
   * 是否暗黑模式
   */
  isDark: boolean
  /**
   * 是否灰色模式
   */
  isGray: boolean
  /**
   * 是否色弱模式
   */
  isWeak: boolean
  /**
   * 主题色
   */
  colorPrimary: string
  /**
   * 导航模式（菜单位置）
   */
  navMode: 'side' | 'top' | 'mixed'
  /**
   * 面包屑导航
   */
  breadcrumb: boolean
  /**
   * 标签导航栏
   */
  tagsView: boolean
  /**
   * 页脚
   */
  footer: boolean
}

interface MenuNode {
  key: string
  label: string
  icon?: string
  children?: MenuNode[]
}

type KeyLabelObject = Record<string, string>

class AppStore {
  /**
   * 主题配置
   */
  themeConfig: ThemeConfig = {
    isDark: false,
    isGray: false,
    isWeak: false,
    breadcrumb: true,
    tagsView: true,
    footer: true,
    colorPrimary: '#1677ff',
    navMode: 'mixed'
  }
  /**
   * 菜单list
   */
  menuList: MenuNode[] = []
  /**
   * 路由对象key:name
   */
  breadcrumbNameMap: KeyLabelObject = {}
  /**
   * TagsView当前选中的key
   */
  tagActiveKey: string = ''
  /**
   * TagsView List
   */
  tagsList: TabsProps['items'] = []
  constructor() {
    // 响应式处理
    makeAutoObservable(this)
    // 持久化存储
    makePersistable(this, {
      name: 'themeConfig', // Storage中name值
      properties: ['themeConfig'], // 需要持久化的数据是什么，此数据需要为上面声明了的变量，并且传值方式为[string]
      storage: window.localStorage //存储位置，常见的就是localStorage/sessionStorage
    })
    this.getMemuList()
  }
  /**
   * 设置主题样式
   * @param config
   */
  setThemeConfig = (config: Partial<ThemeConfig>) => {
    this.themeConfig = { ...this.themeConfig, ...config }
  }
  /**
   * 获取菜单
   */
  getMemuList = () => {
    this.menuList = menus
    this.breadcrumbNameMap = this.setBreadcrumbNameMap(this.menuList)

    // 设置菜单第一项Tag值固定
    this.setTagsViewAdd(this.menuList[0].key, true)
  }
  /**
   * 设置菜单key:label对象
   * @param menuList 菜单列表
   * @returns {key:label}
   */
  setBreadcrumbNameMap = (menuList: MenuNode[]) => {
    const result: KeyLabelObject = {}
    function traverse(node: MenuNode) {
      result[node.key] = node.label
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => traverse(child))
      }
    }
    menuList.forEach((node) => traverse(node))
    return result
  }
  /**
   * 设置tagsList值
   * @param tag
   */
  setTagsViewAdd = (key: string, closeIcon?: boolean) => {
    this.setTagActiveKey(key)
    const isExist = this.tagsList?.some((item) => item.key === key)
    if (!isExist) {
      const label = this.breadcrumbNameMap[key]
      this.setTagsList([...this.tagsList!, { key, label, closeIcon }])
    }
  }
  /**
   * 设置 tagsList 值
   * @param tagsList
   */
  setTagsList = (tagsList: TabsProps['items']) => {
    this.tagsList = tagsList
  }
  /**
   * 设置tagActiveKey的值
   * @param key
   */
  setTagActiveKey = (key: string) => {
    this.tagActiveKey = key
  }
}

const appStore = new AppStore()

export default appStore

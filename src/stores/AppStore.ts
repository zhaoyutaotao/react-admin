import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

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
  menuList: MenuNode[] = []
  breadcrumbNameMap: KeyLabelObject = {}
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
  // 是否主题样式
  setThemeConfig = (config: Partial<ThemeConfig>) => {
    this.themeConfig = { ...this.themeConfig, ...config }
  }
  /**
   * 获取菜单
   */
  getMemuList = () => {
    this.menuList = [
      {
        key: '/home',
        label: '首页',
        icon: 'AppstoreOutlined'
      },
      {
        key: '/echarts',
        label: 'Echarts',
        icon: 'BarChartOutlined',
        children: [{ key: '/echarts/echarts-gl', label: 'EchartsGl' }]
      },
      {
        key: '/antv',
        label: 'Antv',
        icon: 'LineChartOutlined',
        children: [
          { key: '/antv/antv-l7', label: 'AntvL7' },
          { key: '/antv/GaodeMap', label: 'GaodeMap' }
        ]
      },
      {
        key: '/system',
        label: '系统管理',
        icon: 'SettingOutlined',
        children: [
          { key: '/system/user', label: '用户管理' },
          { key: '/system/role', label: '角色管理' },
          { key: '/system/menu', label: '菜单管理' }
        ]
      }
    ]

    this.breadcrumbNameMap = this.setBreadcrumbNameMap(this.menuList)
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
}

const appStore = new AppStore()

export default appStore

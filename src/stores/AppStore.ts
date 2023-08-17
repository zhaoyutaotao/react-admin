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
  constructor() {
    // 响应式处理
    makeAutoObservable(this)
    // 持久化存储
    makePersistable(this, {
      name: 'themeConfig', // Storage中name值
      properties: ['themeConfig'], // 需要持久化的数据是什么，此数据需要为上面声明了的变量，并且传值方式为[string]
      storage: window.localStorage //存储位置，常见的就是localStorage/sessionStorage
    })
  }
  // 是否主题样式
  setThemeConfig = (config: Partial<ThemeConfig>) => {
    this.themeConfig = { ...this.themeConfig, ...config }
  }
}

const appStore = new AppStore()

export default appStore

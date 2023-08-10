import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

interface ThemeConfig{
  // 是否暗黑模式
  isDark:boolean,
}
class AppStore {
  themeConfig:ThemeConfig = {
    isDark: false,
  }
  constructor() {
    // 响应式处理
    makeAutoObservable(this)
    // 持久化存储
    makePersistable(this, {
      name: 'themeConfig', // Storage中name值
      properties: ['themeConfig'], // 需要持久化的数据是什么，此数据需要为上面声明了的变量，并且传值方式为[string]
      storage: window.sessionStorage, //存储位置，常见的就是localStorage/sessionStorage
    })
  }
  // 是否主题样式
  setThemeConfig = (config:ThemeConfig) => {
    this.themeConfig = {...this.themeConfig,...config}
  };
}

const appStore = new AppStore()

export default appStore

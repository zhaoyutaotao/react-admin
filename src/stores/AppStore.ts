import { makeAutoObservable } from 'mobx'
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
  }
  // 是否主题样式
  setThemeConfig = (config:ThemeConfig) => {
    this.themeConfig = {...this.themeConfig,...config}
  };
}

const appStore = new AppStore()

export default appStore

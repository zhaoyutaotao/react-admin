import zhCN from 'antd/locale/zh_CN'
import { App as AntdApp, ConfigProvider, theme } from 'antd'
import 'dayjs/locale/zh-cn'
import { observer } from 'mobx-react-lite'
import Router from 'src/router'
import { useStores } from 'src/stores'

const App = observer(() => {
  const {
    appStore: { themeConfig }
  } = useStores()
  const antdTheme = {
    // 主题算法
    algorithm: themeConfig.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      // 主题色
      colorPrimary: themeConfig.colorPrimary
    },
    components: {
      Layout: {
        siderBg: '#fff',
        headerHeight: 64,
        headerPadding: '0 20px',
        triggerBg: '#fff',
        triggerHeight: 48
      }
    }
  }
  return (
    <ConfigProvider locale={zhCN} theme={antdTheme}>
      <AntdApp>
        <Router />
      </AntdApp>
    </ConfigProvider>
  )
})

export default App

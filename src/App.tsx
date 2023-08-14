import { BrowserRouter } from 'react-router-dom'
import { App as AntdApp, ConfigProvider, theme } from 'antd'
import { observer } from 'mobx-react-lite'
import Router from 'src/routes'
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
    }
  }
  return (
    <BrowserRouter>
      <ConfigProvider theme={antdTheme}>
        <AntdApp>
          <Router />
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  )
})

export default App

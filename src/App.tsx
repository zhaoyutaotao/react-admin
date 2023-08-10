import { BrowserRouter } from 'react-router-dom'
import Router from 'src/routes'
import { observer } from 'mobx-react-lite'
import { App as AntdApp, ConfigProvider,theme } from 'antd'
import { useStores } from 'src/stores'

const App = observer(() => {
  const { appStore } = useStores()
  console.log(JSON.parse(JSON.stringify(appStore.themeConfig)));
  const antdTheme = {
    algorithm: appStore.themeConfig.isDark? theme.darkAlgorithm : theme.defaultAlgorithm,
    // token: {
      
    //   // Seed Token，影响范围大
    //   // colorPrimary: '#00b96b',
    //   // borderRadius: 2,
    //   // // 派生变量，影响范围小
    //   // colorBgContainer: '#f6ffed'
    // }
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

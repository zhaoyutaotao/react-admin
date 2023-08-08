import { BrowserRouter } from 'react-router-dom'
import Router from 'src/routes'
import { ConfigProvider } from 'antd'

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token，影响范围大
            colorPrimary: '#00b96b',
            borderRadius: 2,
            // 派生变量，影响范围小
            colorBgContainer: '#f6ffed'
          }
        }}
      >
        <Router />
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App

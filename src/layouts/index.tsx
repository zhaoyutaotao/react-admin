import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import LayoutFooter from './components/Footer'
import LayoutHeader from './components/Header'
import LayoutMenu from './components/Menu'

const { Content } = Layout

const BasicLayout = () => {
  return (
    <Layout>
      <LayoutHeader />
      <Layout className="flex h-[calc(100vh-64px)]">
        <LayoutMenu />
        <Layout>
          <Content className="m-5">
            <Outlet />
          </Content>
          <LayoutFooter />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default BasicLayout

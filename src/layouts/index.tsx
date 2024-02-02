import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import LayoutFooter from './components/Footer'
import LayoutHeader from './components/Header'
import LayoutMenu from './components/Menu'
import TagsView from './components/TagsView'

const { Content } = Layout

const BasicLayout = () => {
  return (
    <Layout>
      <LayoutMenu />
      <Layout className="h-screen">
        <LayoutHeader />
        <Layout>
          <TagsView />
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

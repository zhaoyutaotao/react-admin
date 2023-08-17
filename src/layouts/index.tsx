import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Breadcrumb from './components/Breadcrumb'
import LayoutFooter from './components/Footer'
import LayoutHeader from './components/Header'
import LayoutMenu from './components/Menu'
import TagsView from './components/TagsView'

const { Content } = Layout

const BasicLayout = () => {
  return (
    <Layout>
      <LayoutHeader />
      <Layout className="flex h-[calc(100vh-64px)]">
        <LayoutMenu />
        <Layout>
          <Breadcrumb />
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

import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import LayoutFooter from './components/Footer'
import LayoutHeader from './components/Header'
import TagsView from './components/TagsView'

const { Content } = Layout

const NoMenuLayout = () => {
  return (
    <Layout>
      <Layout className="h-screen">
        <LayoutHeader />
        <Layout>
          <TagsView />
          <Content className="m-5">
            {/* Outlet就是路由加载的页面要显示的位子 */}
            <Outlet />
          </Content>
          <LayoutFooter />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default NoMenuLayout

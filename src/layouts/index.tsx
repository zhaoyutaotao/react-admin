import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import LayoutMenu from './components/Menu'
import LayoutHeader from './components/Header'

const { Content } = Layout

interface Props {}
const BasicLayout: React.FC<Props> = () => {
  return (
    <Layout>
      <LayoutHeader />
      <Layout className="flex h-[calc(100vh-64px)]">
        <LayoutMenu />
        <Content className="m-5">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default BasicLayout

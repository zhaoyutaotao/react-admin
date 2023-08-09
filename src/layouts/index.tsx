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
      <Layout className='flex'>
        <LayoutMenu />
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default BasicLayout

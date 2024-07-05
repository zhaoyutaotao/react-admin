import { Layout, Space, theme } from 'antd'
import Breadcrumb from '../Breadcrumb'
import AvatarUser from './components/AvatarUser'
import Fullscreen from './components/Fullscreen'
import Theme from './components/Theme'

const { Header } = Layout
const LayoutHeader = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Header style={{ background: colorBgContainer }} className="flex items-center">
      {/* 面包屑导航 */}
      <Breadcrumb />
      <Space className='ml-auto'>
        {/* 主题设置 */}
        <Theme />
        {/* 全屏 */}
        <Fullscreen />
        {/* 用户名称头像 */}
        <AvatarUser />
      </Space>
    </Header>
  )
}

export default LayoutHeader

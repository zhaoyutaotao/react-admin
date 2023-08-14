import { Layout, Space } from 'antd'
import AvatarUser from './components/AvatarUser'
import Fullscreen from './components/Fullscreen'
import Theme from './components/Theme'

const { Header } = Layout
const LayoutHeader = () => {
  return (
    <Header className="flex justify-between items-center text-white">
      <h2>React Admin</h2>
      <Space>
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

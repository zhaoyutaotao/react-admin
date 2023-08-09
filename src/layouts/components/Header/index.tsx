import { Layout, Space } from 'antd'
import AvatarIcon from './components/AvatarUser'
import Fullscreen from './components/Fullscreen'
const { Header } = Layout
const LayoutHeader = () => {
  return (
    <Header className="flex justify-between items-center text-white">
      <h2>React Admin</h2>
      <Space>
        <Fullscreen />
        <AvatarIcon />
      </Space>
    </Header>
  )
}

export default LayoutHeader

import { Layout,Space } from 'antd'
import AvatarIcon from './components/AvatarUser'
const { Header } = Layout
const LayoutHeader = () => {
  return (
    <Header className="flex justify-between items-center text-white">
      <h2>React Admin</h2>
      <Space>
        <AvatarIcon/>
      </Space>
    </Header>
  )
}

export default LayoutHeader

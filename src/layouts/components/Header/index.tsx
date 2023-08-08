import { Layout,Space } from 'antd'
import AvatarIcon from './components/AvatarUser'
import styles from './index.module.scss'
const { Header } = Layout
const LayoutHeader = () => {
  return (
    <Header className={styles.header}>
      <h2>React Admin</h2>
      <Space>
        <AvatarIcon/>
      </Space>
    </Header>
  )
}

export default LayoutHeader

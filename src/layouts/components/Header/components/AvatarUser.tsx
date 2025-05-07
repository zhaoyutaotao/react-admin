import { useNavigate } from 'react-router'
import { App, Avatar, Dropdown, Space } from 'antd'
import type { MenuProps } from 'antd'
import { removeToken } from 'src/common/utils/token-service'

const AvatarUser = () => {
  const { modal } = App.useApp()
  const navigate = useNavigate()

  // 退出登录
  const onLogout = () => {
    modal.confirm({
      title: '提示',
      content: '是否退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        removeToken()
        navigate('/login')
      }
    })
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>个人信息</span>
    },
    {
      key: '2',
      label: <span>修改密码</span>
    },
    {
      type: 'divider'
    },
    {
      key: '3',
      label: <span onClick={onLogout}>退出登录</span>
    }
  ]
  return (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <Space className="cursor-pointer">
        <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>A</Avatar>
        admin
      </Space>
    </Dropdown>
  )
}

export default AvatarUser

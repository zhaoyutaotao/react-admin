import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, Layout } from 'antd'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd'
import { getOpenKeys } from 'src/utils/util'
const { Sider } = Layout
const LayoutMenu = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  // 刷新页面菜单保持高亮
  useEffect(() => {
    setSelectedKeys([pathname])
    setOpenKeys(getOpenKeys(pathname))
  }, [pathname])

  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys)
    const latestOpenKey = openKeys[openKeys.length - 1]
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys)
    setOpenKeys([latestOpenKey])
  }
  // 点击当前菜单跳转页面
  const handleClickMenu: MenuProps['onClick'] = ({ key }: { key: string }) => {
    navigate(key)
  }

  const items = [
    {
      key: '/home',
      label: '首页',
      icon: <AppstoreOutlined/>
    },
    {
      key: '/system',
      label: '系统管理',
      icon: <SettingOutlined />,
      children: [{ key: '/system/menu', label: '菜单管理' }]
    }
  ]

  return (
    <Sider width={200} theme="light" collapsible={true}>
      <Menu
        mode="inline"
        triggerSubMenuAction="click"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        items={items}
        onClick={handleClickMenu}
        onOpenChange={onOpenChange}
      />
    </Sider>
  )
}

export default LayoutMenu

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as icons from '@ant-design/icons'
import Icon from '@ant-design/icons'
import { Menu, Layout } from 'antd'
import type { MenuProps } from 'antd'
import { menus } from 'src/pages/System/Menu/data'
import { useStores } from 'src/stores'
import { getOpenKeys } from 'src/utils/util'

const { Sider } = Layout

//  设置菜单图标方法
const setMenuItemIcon = (data: any[]) => {
  data.forEach((item) => {
    item.icon =
      (item.icon && (icons as any)[item.icon] && <Icon component={(icons as any)[item.icon]} />) ||
      item.icon
    if (item.children) {
      // 调用递归函数
      setMenuItemIcon(item.children)
    }
  })
}

const LayoutMenu = () => {
  const {
    appStore: { setTagsViewAdd }
  } = useStores()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [menuData, setMenuData] = useState<any[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  // 刷新页面菜单保持高亮
  useEffect(() => {
    setSelectedKeys([pathname])
    setOpenKeys(getOpenKeys(pathname))
    setTagsViewAdd(pathname)
  }, [pathname])

  // 设置 menu 数据icon
  useEffect(() => {
    setMenuItemIcon(menus)
    setMenuData([...menus])
  }, [menus])

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

  return (
    <Sider width={200} theme="light" collapsible={true}>
      <Menu
        mode="inline"
        triggerSubMenuAction="click"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        items={menuData}
        onClick={handleClickMenu}
        onOpenChange={onOpenChange}
      />
    </Sider>
  )
}

export default LayoutMenu

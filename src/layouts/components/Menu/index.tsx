import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as icons from '@ant-design/icons'
import Icon, { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Menu, Layout, theme, Button } from 'antd'
import type { MenuProps } from 'antd'
import { cloneDeep } from 'lodash'
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
  return data
}
/**
 * 侧边栏宽度
 */
const siderWidth = 200
/**
 * 侧边栏收起宽度
 */
const siderCollapsedWidth = 80

const LayoutMenu = () => {
  const {
    token: { colorBgContainer, Layout: { headerHeight = 64, triggerHeight = 48 } = {} }
  } = theme.useToken()

  const {
    appStore: { setTagsViewAdd }
  } = useStores()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [menuData, setMenuData] = useState<any[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [collapsed, setCollapsed] = useState(false)
  // 刷新页面菜单保持高亮
  useEffect(() => {
    setSelectedKeys([pathname])
    setOpenKeys(getOpenKeys(pathname))
    setTagsViewAdd(pathname)
  }, [pathname])

  // 设置 menu 数据icon
  useEffect(() => {
    const deepMenus = setMenuItemIcon(cloneDeep(menus))
    setMenuData(deepMenus)
  }, [menus])

  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys)
    const latestOpenKey = openKeys[openKeys.length - 1]
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys)
    setOpenKeys([latestOpenKey])
  }
  // 点击当前菜单跳转页面
  const handleClickMenu: MenuProps['onClick'] = ({ key, item }: { key: string; item: any }) => {
    if (item?.props?.isext === '1') {
      // 外部链接，页面跳转
      window.open(key)
    } else {
      navigate(key)
    }
  }

  return (
    <Sider
      width={siderWidth}
      collapsedWidth={siderCollapsedWidth}
      collapsible
      collapsed={collapsed}
      trigger={
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      }
    >
      <div
        style={{ height: headerHeight, background: colorBgContainer }}
        className="flex items-center justify-center"
      >
        <h1>{collapsed ? 'admin' : 'react-admin'}</h1>
      </div>
      <Menu
        mode="inline"
        triggerSubMenuAction="click"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        items={menuData}
        onClick={handleClickMenu}
        onOpenChange={onOpenChange}
        className="overflow-auto"
        style={{ height: `calc(100vh - ${headerHeight + triggerHeight}px)` }}
      />
    </Sider>
  )
}

export default LayoutMenu

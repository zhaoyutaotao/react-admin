export const menus = [
  {
    key: '/home',
    label: '首页',
    icon: 'AppstoreOutlined'
  },
  {
    key: '/layout',
    label: '布局',
    icon: 'LayoutOutlined',
    children: [
      { key: '/layout/dataScreen', label: '数据大屏' },
      { key: '/layout/nomenu', label: '隐藏菜单' }
    ]
  },
  {
    key: '/frame',
    label: '外部页面',
    icon: 'LinkOutlined',
    children: [
      {
        key: '/frame/antd',
        label: 'Antd(外链)',
        link: 'https://ant-design.antgroup.com/components/overview-cn'
      },
      { key: '/frame/vite', label: 'Vite(内嵌)' }
    ]
  },
  {
    key: '/system',
    label: '系统管理',
    icon: 'SettingOutlined',
    children: [
      { key: '/system/user', label: '用户管理' },
      { key: '/system/role', label: '角色管理' },
      { key: '/system/menu', label: '菜单管理' }
    ]
  }
]

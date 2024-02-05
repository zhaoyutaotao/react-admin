export const menus = [
  {
    key: '/home',
    label: '首页',
    icon: 'AppstoreOutlined'
  },
  {
    key: '/echarts',
    label: 'Echarts',
    icon: 'BarChartOutlined',
    children: [{ key: '/echarts/echarts-gl', label: 'EchartsGl' }]
  },
  {
    key: '/antv',
    label: 'Antv',
    icon: 'LineChartOutlined',
    children: [
      { key: '/antv/antv-l7', label: 'AntvL7' },
      { key: '/antv/GaodeMap', label: 'GaodeMap' }
    ]
  },
  {
    key: '/frame',
    label: '外部页面',
    icon: 'LinkOutlined',
    children: [
      { key: 'https://ant-design.antgroup.com/components/overview-cn', label: 'Antd', isext: '1' },
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

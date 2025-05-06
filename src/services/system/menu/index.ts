export const getMenus = async () => {
  // return request.get<any[]>('/api/system/menuList', params)
  const menus: any = [
    {
      key: '/home',
      label: '首页',
      icon: 'HomeOutlined'
    },
    {
      key: '/document',
      label: '文档',
      icon: 'BookOutlined',
      children: [
        {
          key: '/document/antd',
          label: 'Antd(外链)',
          link: 'https://ant-design.antgroup.com/components/overview-cn'
        },
        { key: '/document/vite', label: 'Vite(内嵌)' }
      ]
    },
    {
      key: '/feature',
      label: '系统功能',
      icon: 'AppstoreOutlined',
      children: [
        { key: '/feature/full-screen', label: '数据大屏' },
        { key: '/feature/nomenu', label: '隐藏菜单' }
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
  return { data: menus }
}

import BasicLayout from 'src/layouts'
import { RouteObject } from '../interface'
import Menu from 'src/pages/System/Menu'

// 系统管理
const systemRouter: Array<RouteObject> = [
  {
    element: <BasicLayout />,
    children: [
      {
        path: '/system/menu',
        element: <Menu />,
      }
    ]
  }
]

export default systemRouter

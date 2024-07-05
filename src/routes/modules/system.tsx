import { lazy } from 'react'
import BasicLayout from 'src/layouts'
import Role from 'src/pages/System/Role'
import User from 'src/pages/System/User'
import { RouteObject } from '../interface'
import lazyLoad from '../utils/lazyLoad'

const Menu = lazy(() => import('src/pages/System/Menu'))

// 系统管理
const systemRouter: Array<RouteObject> = [
  {
    element: <BasicLayout />,
    children: [
      {
        path: '/system/user',
        element: <User />
      },
      {
        path: '/system/role',
        element: <Role />
      },
      {
        path: '/system/menu',
        element: lazyLoad(Menu)
      }
    ]
  }
]

export default systemRouter

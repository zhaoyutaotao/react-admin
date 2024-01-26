import { Suspense, lazy } from 'react'
import BasicLayout from 'src/layouts'
import Role from 'src/pages/System/Role'
import User from 'src/pages/System/User'
import { RouteObject } from '../interface'
const Menu = lazy(() => import('src/pages/System/Menu'))

// 系统管理
const systemRouter: Array<RouteObject> = [
  {
    element: <BasicLayout />,
    children: [
      {
        path: '/system/user',
        element: <User />
      }
    ]
  },
  {
    element: <BasicLayout />,
    children: [
      {
        path: '/system/role',
        element: <Role />
      }
    ]
  },
  {
    element: <BasicLayout />,
    children: [
      {
        path: '/system/menu',
        element: (
          <Suspense fallback={<></>}>
            <Menu />
          </Suspense>
        )
      }
    ]
  }
]

export default systemRouter

import BasicLayout from 'src/layouts'
import { RouteObject } from '../interface'
import Home from 'src/pages/Home'

// 首页模块
const homeRouter: Array<RouteObject> = [
  {
    element: <BasicLayout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      }
    ]
  }
]

export default homeRouter

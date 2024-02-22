import BasicLayout from 'src/layouts'
import Ahooks from 'src/pages/Frame/Ahooks'
import Vite from 'src/pages/Frame/Vite'
import { RouteObject } from '../interface'

// frame页面
const frameRouter: Array<RouteObject> = [
  {
    element: <BasicLayout />,
    children: [
      {
        path: '/frame/vite',
        element: <Vite />
      },
      {
        path: '/frame/ahooks',
        element: <Ahooks />
      }
    ]
  }
]

export default frameRouter

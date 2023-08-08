import { RouteObject } from '../interface'
import NoFoundPage from 'src/pages/404'


// 首页模块
const homeRouter: Array<RouteObject> = [
  {
    path: '/404',
    element: <NoFoundPage />,
  }
]

export default homeRouter

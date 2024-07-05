import NoMenuLayout from 'src/layouts/noMenu'
import DataScree from 'src/pages/Layout/DataScree'
import { RouteObject } from '../interface'

// 布局 加载不同Layout的Demo
const layoutRouter: Array<RouteObject> = [
  {
    path: '/layout/dataScreen',
    element: <DataScree />
  },
  {
    element: <NoMenuLayout />,
    children: [
      {
        path: '/layout/nomenu',
        element: <DataScree />
      }
    ]
  }
]

export default layoutRouter

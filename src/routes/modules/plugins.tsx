import BasicLayout from 'src/layouts'
import { RouteObject } from '../interface'
import WangEditor from 'src/pages/Plugins/WangEditor'

// plugins Demo
const pluginsRouter: Array<RouteObject> = [
  {
    element: <BasicLayout />,
    children: [
      {
        path: '/plugins/wangeditor',
        element: <WangEditor />,
      }
    ]
  }
]

export default pluginsRouter

import BasicLayout from 'src/layouts'
import { RouteObject } from '../interface'
import AntvL7 from 'src/pages/Antv/AntvL7'
import GaodeMap from 'src/pages/Antv/GaodeMap'

// Antv Demo
const echartsRouter: Array<RouteObject> = [
  {
    element: <BasicLayout />,
    children: [
      {
        path: '/antv/antv-l7',
        element: <AntvL7 />,
        meta: {
          requiresAuth: true,
          title: 'antv-l7',
          key: 'antv-l7'
        }
      },
      {
        path: '/antv/gaodeMap',
        element: <GaodeMap />,
        meta: {
          requiresAuth: true,
          title: 'GaodeMap',
          key: 'GaodeMap'
        }
      }
    ]
  }
]

export default echartsRouter

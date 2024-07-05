import BasicLayout from 'src/layouts'
import { RouteObject } from '../interface'
import EchartsMap from 'src/pages/Echarts/EchartsGl'

// Echarts Demo
const echartsRouter: Array<RouteObject> = [
  {
    element: <BasicLayout />,
    children: [
      {
        path: '/echarts/echarts-gl',
        element: <EchartsMap />,
      }
    ]
  }
]

export default echartsRouter

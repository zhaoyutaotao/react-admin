import { Navigate, useRoutes } from 'react-router-dom'
import { RouteObject } from './interface'
import Login from 'src/pages/Login'

// 导入所有router
const loadRouters = () => {
  const metaRouters = import.meta.glob<{ default: RouteObject[] }>('./modules/*.tsx', { eager: true })
  return Object.values(metaRouters).flatMap(module => module.default)
}

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />,
  },
  ...loadRouters(),
  {
    path: '*',
    element: <Navigate to="/404" />
  }
]

const Router = () => {
  const routes = useRoutes(rootRouter)
  return routes
}

export default Router

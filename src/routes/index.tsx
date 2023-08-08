import { Navigate, useRoutes } from 'react-router-dom'
import { RouteObject } from './interface'
import Login from 'src/pages/Login'

// 导入所有router
const metaRouters: Record<
  string,
  (() => Promise<{ default: RouteObject[] }>) | { default: RouteObject[] }
> = import.meta.glob('./modules/*.tsx', { eager: true })
// 处理路由
export const routerArray: RouteObject[] = []
Object.keys(metaRouters).forEach((item) => {
  const routeGetter = metaRouters[item]
  if ('default' in routeGetter) {
    routerArray.push(...routeGetter.default)
  }
})

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: '登录页',
      key: 'login'
    }
  },
  ...routerArray,
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

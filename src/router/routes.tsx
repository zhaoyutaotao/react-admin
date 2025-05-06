import { lazy } from 'react'
import { Navigate } from 'react-router'
import type { RouteObject } from 'react-router'
import BasicLayout from 'src/layouts'
import NoMenuLayout from 'src/layouts/noMenu'

// 页面组件（懒加载）
const Login = lazy(() => import('src/pages/Login'))
const Home = lazy(() => import('src/pages/Home'))
const Vite = lazy(() => import('src/pages/Document/Vite'))
const FullScreen = lazy(() => import('src/pages/Feature/FullScreen'))
const NoMenu = lazy(() => import('src/pages/Feature/NoMenu'))
const User = lazy(() => import('src/pages/System/User'))
const Role = lazy(() => import('src/pages/System/Role'))
const Menu = lazy(() => import('src/pages/System/Menu'))
const NoFoundPage = lazy(() => import('src/pages/404'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <BasicLayout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/document/vite', element: <Vite /> },
      { path: '/system/user', element: <User /> },
      { path: '/system/role', element: <Role /> },
      { path: '/system/menu', element: <Menu /> }
    ]
  },
  {
    path: '/feature/full-screen',
    element: <FullScreen />
  },
  {
    element: <NoMenuLayout />,
    children: [{ path: '/feature/nomenu', element: <NoMenu /> }]
  },
  {
    path: '/404',
    element: <NoFoundPage />
  },
  {
    path: '*',
    element: <Navigate to="/404" />
  }
]

export default routes

import { lazy } from 'react'
import { Navigate } from 'react-router'
import type { RouteObject } from 'react-router'
import BasicLayout from 'src/layouts'
import NoMenuLayout from 'src/layouts/noMenu'

// 页面组件（懒加载）
const Login = lazy(() => import('src/pages/Login'))
const Home = lazy(() => import('src/pages/Home'))
const DataScree = lazy(() => import('src/pages/Layout/DataScree'))
const Vite = lazy(() => import('src/pages/Frame/Vite'))
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
      { path: '/frame/vite', element: <Vite /> },
      { path: '/system/user', element: <User /> },
      { path: '/system/role', element: <Role /> },
      { path: '/system/menu', element: <Menu /> }
    ]
  },
  {
    path: '/layout/dataScreen',
    element: <DataScree />
  },
  {
    element: <NoMenuLayout />,
    children: [{ path: '/layout/nomenu', element: <DataScree /> }]
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

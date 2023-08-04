import { Navigate, useRoutes } from "react-router-dom";
import Login from "src/pages/Login";
import Home from "src/pages/Home";

// * 处理路由
export const routerArray: any[] = [];

export const rootRouter: any[] = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: "login",
    },
  },
  {
    path: "/home",
    element: <Home />,
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: "login",
    },
  },
  ...routerArray,
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;

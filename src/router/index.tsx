import { createBrowserRouter, RouterProvider } from 'react-router';
import routes from './routes';

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL, // 动态设置base路径
});

const Router = () => {
  return <RouterProvider router={router} />
};

export default Router;

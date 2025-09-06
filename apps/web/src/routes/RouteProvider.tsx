import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

import DefaultComponent from '@/components/DefaultComponent';
import APIErrorBoundary from '@/components/ErrorBoundary/APIErrorBoundary';
import UnknownErrorBoundary from '@/components/ErrorBoundary/UnKnownErrorBoudary';
import SomethingWentWrong from '@/components/ErrorPage/SomethingWentWrong';
import { PATH } from '@/constants';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

type ROUTE_TYPE = 'PRIVATE' | 'PUBLIC';

const createAuthRouter = (routeType: ROUTE_TYPE, children: RouteObject[]) => {
  const authRouter = children.map((child: RouteObject) => ({
    element: routeType === 'PRIVATE' ? <PrivateRoute /> : <PublicRoute />,
    children: [child],
  }));
  return authRouter;
};

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: (
      <UnknownErrorBoundary>
        <APIErrorBoundary>
          <Outlet />
        </APIErrorBoundary>
      </UnknownErrorBoundary>
    ),
    errorElement: <SomethingWentWrong />,
    children: [
      {
        index: true,
        element: <DefaultComponent />,
      },
      ...createAuthRouter('PRIVATE', []),
      ...createAuthRouter('PUBLIC', []),
      {
        path: '*',
        element: <SomethingWentWrong />,
      },
    ],
  },
]);

const RouteProvider = () => <RouterProvider router={router} />;

export default RouteProvider;

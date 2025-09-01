import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import { PATH } from '@/constants/path';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import SomethingWentWrong from '@components/ErrorPage/SomethingWentWrong';
import APIErrorBoundary from '@components/ErrorBoundary/APIErrorBoundary';
import { UnknownErrorBoundary } from '@components/ErrorBoundary/UnKnownErrorBoudary';
import DefaultComponent from '@components/DefaultComponent';

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
        path: PATH.ROOT,
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

export const RouteProvider = () => <RouterProvider router={router} />;

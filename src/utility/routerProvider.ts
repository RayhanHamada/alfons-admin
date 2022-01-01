import { IRouterProvider } from '@pankod/refine';
import rf from '@pankod/refine-nextjs-router';
import { ReactNode } from 'react';

type Route = {
  exact?: boolean;
  component: ReactNode;
  path: `/${string}`;
};

type ICustomRouteProvider = Omit<IRouterProvider, 'routes'> & {
  routes?: Route[];
};

export const routerProvider: ICustomRouteProvider = {
  ...rf,
};

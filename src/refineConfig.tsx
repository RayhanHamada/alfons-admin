import {
  CabangCreate,
  CabangList,
  Login,
  ServiceCategoryCreate,
  ServiceCategoryList,
  ServiceCreate,
  ServiceList,
  Title,
} from '@components';
import { Icons } from '@pankod/refine';
import routerProvider from '@pankod/refine-nextjs-router';
import type { RefineProps } from '@pankod/refine/dist/components/containers/refine';
import { authProvider, dataProvider } from '@utility';

const { ApartmentOutlined } = Icons;

const resources: RefineProps['resources'] = [
  {
    name: 'cabang',
    icon: <ApartmentOutlined />,
    options: { label: 'Cabang' },
    canDelete: true,
    list: CabangList,
    create: CabangCreate,
  },
  {
    name: 'service_category',
    options: { label: 'Kategori Service' },
    canDelete: true,
    list: ServiceCategoryList,
    create: ServiceCategoryCreate,
  },
  {
    name: 'service',
    options: { label: 'Service' },
    list: ServiceList,
    create: ServiceCreate,
  },
];

const refineProps: RefineProps = {
  dataProvider: dataProvider,
  authProvider: authProvider,
  routerProvider: routerProvider,
  resources: resources,
  Title: Title,
  LoginPage: Login,
};

export default refineProps;

import {
  AdminCreate,
  AdminList,
  AdminShow,
  CabangList,
  KlienCreate,
  KlienList,
  Login,
  ServiceCategoryCreate,
  ServiceCategoryList,
  ServiceCreate,
  ServiceList,
  StylishCreate,
  StylishEdit,
  StylishList,
  Title,
} from '@components';
import { MyAccount } from '@components/my-account';
import { Icons } from '@pankod/refine';
import type { RefineProps } from '@pankod/refine/dist/components/containers/refine';
import { authProvider } from '@utility/authProvider';
import { dataProvider } from '@utility/dataProvider';
import { routerProvider } from '@utility/routerProvider';

const {
  ApartmentOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  AccountBookOutlined,
  ToolOutlined,
  FormatPainterOutlined,
} = Icons;

const resources: RefineProps['resources'] = [
  {
    name: 'cabang',
    icon: <ApartmentOutlined />,
    options: { label: 'Cabang' },
    canDelete: true,
    list: CabangList,
    create: KlienCreate,
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
    icon: <ToolOutlined />,
  },
  {
    name: 'klien',
    options: { label: 'Klien' },
    list: KlienList,
    create: KlienCreate,
    icon: <AccountBookOutlined />,
  },
  {
    name: 'stylish',
    options: { label: 'Stylish' },
    list: StylishList,
    create: StylishCreate,
    edit: StylishEdit,
    icon: <FormatPainterOutlined />,
  },
  {
    name: 'admin',
    options: { label: 'Admin' },
    list: AdminList,
    create: AdminCreate,
    show: AdminShow,
    icon: <CustomerServiceOutlined />,
  },
  /**
   * for admin
   */
  {
    name: 'myaccount',
    options: {
      label: 'Akun Saya',
    },
    list: MyAccount,
    icon: <UserOutlined />,
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

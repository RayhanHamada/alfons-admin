import { CabangCreate, CabangList } from '@components/cabang';
import { ServiceCategoryList } from '@components/serviceCategory/list';
import Title from '@components/Title';
import { Icons, Refine } from '@pankod/refine';
import routerProvider from '@pankod/refine-nextjs-router';
import { dataProvider } from '@pankod/refine-supabase';
import { RefineProps } from '@pankod/refine/dist/components/containers/refine';
import '@pankod/refine/dist/styles.min.css';
import { AppProps } from 'next/app';
import React from 'react';
import { authProvider } from 'src/authProvider';
import { supabaseClient } from 'src/utility';

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
  },
];

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(supabaseClient)}
      authProvider={authProvider}
      resources={resources}
      Title={Title}
    >
      <Component {...pageProps} />
    </Refine>
  );
}

export default MyApp;

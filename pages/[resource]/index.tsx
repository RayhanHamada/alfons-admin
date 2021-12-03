import { checkAuthentication } from '@pankod/refine-nextjs-router';
import { dataProvider } from '@pankod/refine-supabase';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { authProvider } from 'src/authProvider';
import { supabaseClient } from 'src/utility';
export { NextRouteComponent as default } from '@pankod/refine-nextjs-router';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated, ...props } = await checkAuthentication(
    authProvider,
    context
  );

  if (!isAuthenticated) {
    return props;
  }

  const { query } = context;

  try {
    const { token } = nookies.get(context);
    await supabaseClient.auth.setAuth(token);

    const data = await dataProvider(supabaseClient).getList({
      resource: query['resource'] as string,
    });

    return {
      props: {
        initialData: data,
      },
    };
  } catch (error) {
    return { props: {} };
  }
};

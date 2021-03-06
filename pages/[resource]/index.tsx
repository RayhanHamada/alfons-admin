import { checkAuthentication } from '@pankod/refine-nextjs-router';
import { authProvider } from '@utility/authProvider';
import { dataProvider } from '@utility/dataProvider';
import { supabaseBrowserClient } from '@utility/supabaseBrowserClient';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
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
    await supabaseBrowserClient.auth.setAuth(token);

    const data = await dataProvider.getList({
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

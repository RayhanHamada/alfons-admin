import { checkAuthentication } from '@pankod/refine-nextjs-router';
import { GetServerSideProps } from 'next';
import { authProvider } from 'src/authProvider';
export { NextRouteComponent as default } from '@pankod/refine-nextjs-router';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated, ...props } = await checkAuthentication(
    authProvider,
    context
  );

  if (!isAuthenticated) {
    return props;
  }

  return {
    props: {},
  };
};

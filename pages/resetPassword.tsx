import { ResetPasswordForm } from '@components/ResetPasswordForm';
import { AntdLayout } from '@pankod/refine';
import type { NextPage } from 'next';

const ResetPassword: NextPage = (_props) => {
  return (
    <AntdLayout style={{ height: '100vh', width: '100%' }}>
      <ResetPasswordForm />
    </AntdLayout>
  );
};

export default ResetPassword;

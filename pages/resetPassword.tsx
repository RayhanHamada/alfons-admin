import { ResetPasswordForm } from '@components/ResetPasswordForm';
import { AntdLayout, Col, Typography } from '@pankod/refine';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;

const ResetPassword: NextPage = (_props) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (window.location.hash.includes('type=recovery')) {
      const hash = window.location.hash.split('#')[1];
      const query = new URLSearchParams(hash);
      setAccessToken(query.get('access_token'));
    }
  }, []);

  return (
    <AntdLayout style={{ height: '100vh', width: '100%' }}>
      <Col
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {accessToken ? (
          <>
            <Title level={3}>Reset Password anda</Title>
            <Text>Masukkan password baru anda</Text>
            <ResetPasswordForm accessToken={accessToken} />
          </>
        ) : (
          <>
            <Title level={4}>
              Link Reset Password sudah kadaluarsa. Silahkan buat permintaan
              untuk reset password lagi.
            </Title>
          </>
        )}
      </Col>
    </AntdLayout>
  );
};

export default ResetPassword;

import { ForgotPasswordForm } from '@components/ForgotPassword';
import { AntdLayout, Col, Typography } from '@pankod/refine';
import type { NextPage } from 'next';

const { Title, Text } = Typography;

const ForgotPassword: NextPage = (_props) => {
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
        <Title level={3}>Permintaan untuk reset password</Title>
        <Text>
          Masukkan email yang anda gunakan untuk login. Jika pernah terdaftar
          pada sistem, maka permintaan akan dikirim.
        </Text>
        <ForgotPasswordForm />
      </Col>
    </AntdLayout>
  );
};

export default ForgotPassword;

import {
  Button,
  Col,
  Form,
  Icons,
  Input,
  message,
  Spin,
  Typography,
} from '@pankod/refine';
import { updatePassword } from '@utility/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const { Password } = Input;
const { LoadingOutlined } = Icons;
const { Title, Text } = Typography;

type IForm = {
  password?: string;
};

type OnFinish = (v: IForm) => void;

export const ResetPasswordForm: React.FC = (_props) => {
  const router = useRouter();
  const [form] = Form.useForm<IForm>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    if (window.location.hash.includes('type=recovery')) {
      const hash = window.location.hash.split('#')[1];
      const query = new URLSearchParams(hash);
      const at = query.get('access_token');

      if (at) setAccessToken(at);
    }
  }, []);

  const onFinish: OnFinish = async ({ password }) => {
    if (!password || password === '') {
      message.error('Password tidak boleh kosong', 3);
      return;
    }

    setIsSubmitting(true);
    const res = await updatePassword(accessToken!, password);

    if (!res.ok)
      return message.error(
        'Terjadi kesalahan. Silahkan request lagi untuk ubah password.',
        4
      );

    const { email } = (await res.json()) as { email: string };

    message.success(`Berhasil mengubah password untuk email ${email}.`, 1);
    setIsSubmitting(false);

    setTimeout(() => {
      router.push('/login');
    }, 1000);
  };

  return (
    <>
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
            <Form
              layout="vertical"
              style={{ width: '400px', marginTop: '30px' }}
              form={form}
              onFinish={onFinish}
              requiredMark
            >
              <Form.Item
                name="password"
                rules={[{ required: true, min: 8 }]}
                style={{ marginBottom: '12px' }}
              >
                <Password placeholder="Password baru anda" minLength={8} />
              </Form.Item>

              <Spin
                indicator={<LoadingOutlined spin />}
                spinning={isSubmitting}
              >
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  disabled={isSubmitting}
                >
                  Reset Password !
                </Button>
              </Spin>
              <br />
              <u hidden={isSubmitting}>
                <Link href="/login">Batalkan dan ke login</Link>
              </u>
            </Form>
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
    </>
  );
};

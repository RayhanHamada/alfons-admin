import { Button, Form, Input, message } from '@pankod/refine';
import { ky } from '@utility/ky';
import { useRouter } from 'next/router';
import { useState } from 'react';

const { Password } = Input;

type IForm = {
  password?: string;
};

type OnFinish = (v: IForm) => void;

type Props = {
  accessToken: string;
};

export const ResetPasswordForm: React.FC<Props> = ({ accessToken }) => {
  const router = useRouter();
  const [form] = Form.useForm<IForm>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish: OnFinish = async ({ password }) => {
    if (!password || password === '') {
      message.error('Password tidak boleh kosong', 3);
      return;
    }

    setIsSubmitting(true);
    await ky
      .post('api/updatePassword', {
        json: {
          accessToken,
          password,
        },
      })
      .then(async (res) => {
        if (!res.ok) {
          message.error(
            'Terjadi kesalahan. Silahkan request lagi untuk ubah password.',
            4
          );
        }

        const user = (await res.json()) as { email: string };

        message.success(`Password untuk ${user.email} berhasil direset !`);
      })
      .catch(() => {
        message.error(
          'Terjadi kesalahan. Silahkan request lagi untuk ubah password.',
          4
        );
      });

    setIsSubmitting(false);

    setTimeout(() => {
      router.push('/login');
    }, 1000);
  };

  return (
    <Form
      layout="vertical"
      style={{ width: '400px', marginTop: '30px' }}
      form={form}
      onFinish={onFinish}
      requiredMark
    >
      <Form.Item
        name="password"
        rules={[{ required: true }]}
        style={{ marginBottom: '12px' }}
      >
        <Password placeholder="Password baru anda" minLength={8} />
      </Form.Item>

      <Button type="primary" size="large" htmlType="submit">
        Reset Password !
      </Button>
    </Form>
  );
};

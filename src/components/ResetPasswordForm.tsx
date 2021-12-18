import { Button, Form, Input, message } from '@pankod/refine';
import { supabaseBrowserClient } from '@utility/supabaseBrowserClient';
import { useRouter } from 'next/router';

const { Password } = Input;

type IForm = {
  password: string;
};

type OnFinish = (v: IForm) => void;

type Props = {
  accessToken: string;
};

export const ResetPasswordForm: React.FC<Props> = ({ accessToken }) => {
  const router = useRouter();
  const [form] = Form.useForm<IForm>();

  const onFinish: OnFinish = async ({ password }) => {
    if (password === null || password === '') {
      message.error('Password tidak boleh kosong', 3);
      return;
    }

    // TODO: panggil updateUser di api
    await supabaseBrowserClient.auth.api
      .updateUser(accessToken, { password })
      .then(({ user, error }) => {
        if (error) {
          message.error(
            'Terjadi kesalahan. Silahkan request lagi untuk ubah password.',
            4
          );
        }

        message.success(`Password untuk ${user!.email} berhasil direset !`);

        setTimeout(() => {
          router.push('/login');
        }, 3000);
      });
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

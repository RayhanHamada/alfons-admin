import { Button, Form, Input, message } from '@pankod/refine';
import { ky } from '@utility/ky';

type IForm = {
  email: string;
};

type OnFinish = (v: IForm) => void;

export const ForgotPasswordForm: React.FC = (_props) => {
  const [form] = Form.useForm<IForm>();

  const onFinish: OnFinish = async (v) => {
    if (v.email === '' || v.email === null) {
      message.error('Email tidak valid');
      return;
    }

    await ky
      .post('api/resetPassword', {
        json: {
          email: v.email,
        },
        mode: 'cors',
      })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            message.error('Email tidak terdaftar');
          } else if (res.status === 500) {
            message.error('Terjadi kesalahan pada server');
          }
          return;
        }

        message.success(
          <p>
            <b>Terkirim !</b> Silahkan cek <b>{v.email}</b> pada bagian Inbox
            atau Spam.
          </p>,
          5
        );
      })
      .catch(() => {
        message.error('Terjadi kesalahan');
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
        name="email"
        rules={[{ required: true }]}
        style={{ marginBottom: '12px' }}
      >
        <Input type="email" placeholder="budi@example.com" />
      </Form.Item>
      <Button type="primary" size="large" htmlType="submit">
        Kirim permintaan reset password
      </Button>
    </Form>
  );
};

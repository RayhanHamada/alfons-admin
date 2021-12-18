import { Button, Form, Input, message } from '@pankod/refine';
import { supabaseBrowserClient } from '@utility/supabaseBrowserClient';

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

    // TODO panggil resetPasswordForEmail di api
    await supabaseBrowserClient.auth.api
      .resetPasswordForEmail(v.email)
      .then(({ error }) => {
        if (error) {
          message.error('Email tidak valid');
        }

        message.success(
          <p>
            <b>Terkirim !</b> Silahkan cek <b>{v.email}</b> pada bagian Inbox
            atau Spam.
          </p>,
          5
        );
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

import { Button, Form, Icons, Input, message, Spin } from '@pankod/refine';
import { updatePassword } from '@utility/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const { Password } = Input;
const { LoadingOutlined } = Icons;

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
    const res = await updatePassword(accessToken, password);

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

      <Spin indicator={<LoadingOutlined spin />} spinning={isSubmitting}>
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
  );
};

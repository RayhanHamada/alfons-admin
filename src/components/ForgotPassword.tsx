import { Button, Form, Icons, Input, message, Spin } from '@pankod/refine';
import { resetPassword } from '@utility/api';
import Link from 'next/link';
import { useState } from 'react';

type IForm = {
  email: string;
};

type OnFinish = (v: IForm) => void;

const { LoadingOutlined } = Icons;

export const ForgotPasswordForm: React.FC = (_props) => {
  const [form] = Form.useForm<IForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish: OnFinish = async (v) => {
    if (v.email === '' || v.email === null) {
      message.error('Email tidak valid');
      return;
    }

    setIsSubmitting(true);

    const { ok, status } = await resetPassword(v.email);

    if (!ok) {
      if (status === 404) {
        message.error('Email tidak terdaftar');
      } else if (status === 500) {
        message.error('Terjadi kesalahan pada server');
      }
      return;
    }

    message.success(
      <p>
        <b>Terkirim !</b> Silahkan cek <b>{v.email}</b> pada bagian Inbox atau
        Spam.
      </p>,
      5
    );

    form.resetFields();
    setIsSubmitting(false);
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
      <Spin indicator={<LoadingOutlined spin />} spinning={isSubmitting}>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          disabled={isSubmitting}
        >
          Kirim permintaan reset password
        </Button>
      </Spin>
      <br />
      <u hidden={isSubmitting}>
        <Link href="/login">Kembali ke login</Link>
      </u>
    </Form>
  );
};

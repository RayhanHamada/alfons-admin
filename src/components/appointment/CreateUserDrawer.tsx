import { IKlien } from '@components';
import {
  Button,
  Drawer,
  Form,
  Input,
  message,
  Radio,
  Typography,
} from '@pankod/refine';
import useCreateAppointmentStore from '@utility/hooks/useCreateAppointmentStore';
import { supabaseBrowserClient } from '@utility/supabaseBrowserClient';
import { useState } from 'react';

type CreateUserDrawerFormValue = {
  name: string;
  jenis_kelamin: 'PRIA' | 'WANITA';
  phone_number: string;
};

const { Title } = Typography;

export const CreateUserDrawer: React.FC = (_props) => {
  const { isCreateKlienDrawerOpen, closeCreateKlienDrawer } =
    useCreateAppointmentStore();

  const [form] = Form.useForm<CreateUserDrawerFormValue>();
  const [freeze, setFreeze] = useState(false);

  const onFinish = async ({
    name,
    phone_number,
    jenis_kelamin,
  }: CreateUserDrawerFormValue) => {
    setFreeze(true);

    const { data: klienData, error: klienError } = await supabaseBrowserClient
      .from<IKlien>('klien')
      .select('name, phone_number')
      .eq('phone_number', phone_number)
      .single();

    if (klienError) {
      message.error(`Gagal mengambil data klien`, 1);
    }

    if (klienData) {
      message.error(`Nomor telepon sudah dipakai user ${klienData.name}`);
    } else {
      const { data: insertData, error: insertError } =
        await supabaseBrowserClient
          .from<IKlien>('klien')
          .insert({
            name,
            jenis_kelamin,
            phone_number,
          })
          .single();

      if (insertError || !insertData) {
        return message.error(`Gagal membuat klien`, 1);
      } else {
        await message.success(`Sukses membuat klien.`, 1);
      }
    }

    form.resetFields();
    setFreeze(false);
  };

  return (
    <Drawer
      visible={isCreateKlienDrawerOpen}
      size="large"
      title={<Title level={4}>Buat Klien Baru</Title>}
      onClose={closeCreateKlienDrawer}
    >
      <Form
        layout="vertical"
        style={{ width: '400px' }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Nama Klien"
          name="name"
          rules={[
            {
              required: true,
              max: 100,
              type: 'string',
            },
          ]}
        >
          <Input autoComplete="off" disabled={freeze} />
        </Form.Item>
        <Form.Item
          label="Jenis kelamin"
          name="jenis_kelamin"
          initialValue="PRIA"
          key="jenis_kelamin"
          requiredMark
          required
        >
          <Radio.Group disabled={freeze}>
            <Radio value="PRIA">Pria</Radio>
            <Radio value="WANITA">Wanita</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Nomor Telepon"
          name="phone_number"
          rules={[
            {
              required: true,
              max: 20,
              type: 'string',
            },
          ]}
          requiredMark
          required
        >
          <Input autoComplete="off" disabled={freeze} />
        </Form.Item>
        <Button type="primary" htmlType="submit" disabled={freeze}>
          Buat Klien Baru
        </Button>
      </Form>
    </Drawer>
  );
};

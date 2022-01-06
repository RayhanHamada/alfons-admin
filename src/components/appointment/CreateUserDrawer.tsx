import type { IKlien } from '@components';
import { Create, Drawer, Form, Input, Radio, useForm } from '@pankod/refine';

export const CreateUserDrawer: React.FC = (_props) => {
  const { saveButtonProps, formProps } = useForm<IKlien>();

  return (
    <Drawer>
      <Create
        resource="klien"
        title="Buat Klien Baru"
        saveButtonProps={saveButtonProps}
      >
        <Form {...formProps} layout="vertical" style={{ width: '500px' }}>
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
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Jenis kelamin"
            name="jenis_kelamin"
            initialValue="PRIA"
            key="jenis_kelamin"
            requiredMark
            required
          >
            <Radio.Group>
              <Radio value="PRIA">Pria</Radio>
              <Radio value="WANITA">Wanita</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Nomor Telepon"
            name="phone_number"
            rules={[
              {
                max: 20,
                type: 'string',
              },
            ]}
            requiredMark
            required
          >
            <Input autoComplete="off" />
          </Form.Item>
        </Form>
      </Create>
    </Drawer>
  );
};

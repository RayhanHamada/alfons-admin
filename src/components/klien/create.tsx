import type { ICabang } from '@components';
import {
  Create,
  Form,
  Input,
  IResourceComponentsProps,
  Select,
  useForm,
} from '@pankod/refine';

export const KlienCreate: React.FC<IResourceComponentsProps<ICabang>> = (
  _props
) => {
  const { saveButtonProps, formProps } = useForm<ICabang>();

  return (
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
          <Select>
            <Select.Option value="PRIA">Pria</Select.Option>
            <Select.Option value="WANITA">Wanita</Select.Option>
          </Select>
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
          required
        >
          <Input autoComplete="off" />
        </Form.Item>
      </Form>
    </Create>
  );
};

import type { IKlien } from '@components';
import {
  Create,
  Form,
  Input,
  IResourceComponentsProps,
  Radio,
  useForm,
} from '@pankod/refine';

export const KlienCreate: React.FC<IResourceComponentsProps<IKlien>> = (
  _props
) => {
  const { saveButtonProps, formProps } = useForm<IKlien>();

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
          required
        >
          <Input autoComplete="off" />
        </Form.Item>
      </Form>
    </Create>
  );
};

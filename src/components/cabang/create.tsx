import { ICabang } from '@components/interfaces';
import {
  Create,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
} from '@pankod/refine';

export const CabangCreate: React.FC<IResourceComponentsProps<ICabang>> = (
  _props
) => {
  const { saveButtonProps, formProps } = useForm<ICabang>();

  return (
    <Create
      resource="cabang"
      title="Buat Cabang Baru"
      saveButtonProps={saveButtonProps}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Nama Cabang"
          name="name"
          rules={[
            {
              required: true,
              max: 50,
              type: 'string',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};

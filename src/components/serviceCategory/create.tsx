import { IServiceCategory } from '@components/interfaces';
import {
  Create,
  Form,
  Input,
  IResourceComponentsProps,
  useForm,
} from '@pankod/refine';

export const ServiceCategoryCreate: React.FC<
  IResourceComponentsProps<IServiceCategory>
> = (_props) => {
  const { saveButtonProps, formProps } = useForm<IServiceCategory>();

  return (
    <Create
      resource="service_category"
      title="Buat Kategori Service Baru"
      saveButtonProps={saveButtonProps}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Nama Kategori Service"
          name="name"
          rules={[
            {
              required: true,
              max: 100,
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

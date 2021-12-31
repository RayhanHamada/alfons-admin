import { IService, IServiceCategory } from '@components';
import {
  Create,
  Form,
  Input,
  InputNumber,
  IResourceComponentsProps,
  Row,
  Select,
  TextField,
  useForm,
  useSelect,
} from '@pankod/refine';
import { useState } from 'react';

export const ServiceCreate: React.FC<IResourceComponentsProps<IService>> = (
  _props
) => {
  const { selectProps } = useSelect<IServiceCategory>({
    resource: 'service_category',
    onSearch: (value) => [
      {
        field: 'name',
        operator: 'contains',
        value,
      },
    ],
    fetchSize: 100,
    optionLabel: 'name',
    optionValue: 'id',
    debounce: 300,
    defaultValue: '1',
  });

  const { saveButtonProps, formProps } = useForm<IService>();

  const [harga, setHarga] = useState(0);

  const onHargaChange: (h: number) => void = (h) => {
    if (h === null) {
      setHarga(0);
      return;
    }
    setHarga(h);
  };

  return (
    <Create
      resource="service_category"
      title="Buat Service Baru"
      saveButtonProps={saveButtonProps}
    >
      <Form {...formProps} autoComplete="off" layout="vertical">
        <Form.Item
          label="Nama Service"
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
        <Form.Item
          label="Kategori Service"
          name="service_category_id"
          initialValue="Cut"
          required
        >
          <Select {...selectProps} />
        </Form.Item>
        <Row style={{ columnGap: 10 }} align="middle">
          <Form.Item label="Perkiraan Harga" name="cost_estimate" required>
            <InputNumber
              defaultValue={0}
              formatter={(value) =>
                `IDR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }
              parser={(value) =>
                value === null
                  ? '0'
                  : (value!.replace(/IDR\s?|(\.*)/g, '') as any)
              }
              style={{ width: 300 }}
              onChange={onHargaChange}
            />
          </Form.Item>
          <TextField
            value={harga}
            // options={{ currency: 'idr', style: 'currency' }}
            style={{ width: 400 }}
          />
        </Row>
      </Form>
    </Create>
  );
};

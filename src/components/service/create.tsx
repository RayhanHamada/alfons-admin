import { IService } from '@components/interfaces';
import {
  Create,
  Form,
  Input,
  InputNumber,
  IResourceComponentsProps,
  NumberField,
  Row,
  TextField,
  useForm,
} from '@pankod/refine';
import { useState } from 'react';

export const ServiceCreate: React.FC<IResourceComponentsProps<IService>> = (
  _props
) => {
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
      <Form {...formProps} layout="vertical">
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
        <Row style={{ columnGap: 10 }} align="middle">
          <Form.Item label="Perkiraan Harga" name="cost_estimate" required>
            <InputNumber
              defaultValue={0}
              formatter={(value) =>
                `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }
              parser={(value) =>
                value === null
                  ? '0'
                  : (value!.replace(/Rp\.\s?|(\.*)/g, '') as any)
              }
              style={{ width: 300 }}
              onChange={onHargaChange}
            />
          </Form.Item>
          <NumberField
            value={harga}
            // options={{ currency: 'idr', style: 'currency' }}
            style={{ width: 400 }}
          />
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

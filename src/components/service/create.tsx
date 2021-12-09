import type { IService, IServiceCategory } from '@components';
import {
  Create,
  Form,
  Input,
  InputNumber,
  IResourceComponentsProps,
  Row,
  Select,
  Skeleton,
  TextField,
  useForm,
  useList,
} from '@pankod/refine';
import { useEffect, useState } from 'react';

export const ServiceCreate: React.FC<IResourceComponentsProps<IService>> = (
  _props
) => {
  const {
    data,
    isFetched,
    isLoading: isCategoryLoading,
  } = useList<IServiceCategory>({
    resource: 'service_category',
    config: {
      pagination: {
        pageSize: 100,
      },
      sort: [{ field: 'name', order: 'asc' }],
    },
  });

  const [categories, setCategories] = useState<
    { label: string; value: string; key?: string }[]
  >([]);

  useEffect(() => {
    if (isFetched) {
      if (data) {
        setCategories(
          data.data.map((v) => ({
            label: v.name,
            value: `${v.id!}`,
            key: `${v.id!}`,
          }))
        );
      }
    }
  }, [data]);

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

        {isCategoryLoading ? (
          <Skeleton active={isCategoryLoading} />
        ) : categories ? (
          <Form.Item
            label="Kategori Service"
            name="service_category_id"
            initialValue="1"
            required
          >
            <Select defaultValue="1" showSearch>
              {categories.map((c) => (
                <Select.Option key={c.value} value={c.value}>
                  {c.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ) : (
          <p>Error fetching categories</p>
        )}

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

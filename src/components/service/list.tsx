import type { IService, IServiceCategory } from '@components';
import {
  Button,
  Col,
  DeleteButton,
  EditButton,
  FilterDropdown,
  Form,
  HttpError,
  Icons,
  Input,
  InputNumber,
  IResourceComponentsProps,
  List,
  NumberField,
  Row,
  SaveButton,
  Select,
  Skeleton,
  Space,
  Table,
  TextField,
  useEditableTable,
  useList,
  useMany,
} from '@pankod/refine';
import { useEffect, useState } from 'react';

export const ServiceList: React.FC<IResourceComponentsProps<IService>> = (
  _props
) => {
  const {
    isEditing,
    editButtonProps,
    tableProps,
    saveButtonProps,
    cancelButtonProps,
    searchFormProps,
    formProps,
  } = useEditableTable<
    IService,
    HttpError,
    {},
    { name: string; category: string }
  >({
    submitOnEnter: true,
    onSearch: ({ name, category }) => {
      return [
        {
          field: 'name',
          operator: 'contains',
          value: name,
        },
        {
          field: 'service_category_id',
          operator: 'eq',
          value: category,
        },
      ];
    },
    initialSorter: [
      {
        field: 'name',
        order: 'asc',
      },
    ],
  });

  const serviceCategoryIds =
    tableProps.dataSource?.map((service) => `${service.service_category_id}`) ??
    [];

  const { data: serviceCategoryDatas, isLoading } = useMany<IServiceCategory>({
    resource: 'service_category',
    ids: serviceCategoryIds,
    queryOptions: {
      enabled: serviceCategoryIds.length > 0,
    },
  });

  const {
    data: serviceCategories,
    isFetched: isServiceCategoryFetched,
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
    if (isServiceCategoryFetched) {
      if (serviceCategories) {
        setCategories(
          serviceCategories.data.map((v) => ({
            label: v.name,
            value: `${v.id!}`,
            key: `${v.id!}`,
          }))
        );
      }
    }
  }, [serviceCategories]);

  return (
    <Col>
      <Form layout="vertical" {...searchFormProps}>
        <Form.Item label="Cari Service" name="name">
          <Input placeholder="Service" prefix={<Icons.SearchOutlined />} />
        </Form.Item>
        <Row style={{ columnGap: 10 }}>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Cari Service
            </Button>
          </Form.Item>
        </Row>
      </Form>
      <List
        title="Service"
        createButtonProps={{ children: 'Buat Service Baru' }}
        canCreate
      >
        <Form {...formProps}>
          <Table {...tableProps} rowKey="id">
            <Table.Column<IService>
              title="No"
              render={(_, __, i) => {
                if (
                  tableProps.pagination &&
                  tableProps.pagination.current &&
                  tableProps.pagination.pageSize
                ) {
                  return (
                    <p>
                      {(tableProps.pagination.current - 1) *
                        tableProps.pagination.pageSize +
                        (i + 1)}
                    </p>
                  );
                }

                return <p>-</p>;
              }}
            />
            <Table.Column<IService>
              key="name"
              dataIndex="name"
              title="Nama Service"
              render={(value, record) => {
                if (isEditing(record.id!)) {
                  return (
                    <Form.Item
                      name="name"
                      initialValue={value}
                      style={{ margin: 0 }}
                    >
                      <Input />
                    </Form.Item>
                  );
                }
                return <TextField value={value} />;
              }}
            />
            <Table.Column<IService>
              key="cost_estimate"
              dataIndex="cost_estimate"
              title="Perkiraan Harga"
              render={(value, record) => {
                if (isEditing(record.id!)) {
                  return (
                    <Form.Item
                      name="cost_estimate"
                      initialValue={value}
                      style={{ margin: 0 }}
                    >
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
                      />
                    </Form.Item>
                  );
                }

                return (
                  <NumberField
                    value={value}
                    options={{ currency: 'idr', style: 'currency' }}
                  />
                );
              }}
            />
            <Table.Column<IService>
              key="service_category_id"
              dataIndex="service_category_id"
              title="Kategori Service"
              filterDropdown={(props) => (
                <FilterDropdown {...props}>
                  <Select
                    placeholder="Select Category"
                    style={{ width: 200 }}
                    showSearch
                  >
                    {isCategoryLoading ? (
                      <Skeleton />
                    ) : categories.length === 0 ? (
                      <p>Error Fetching Categories</p>
                    ) : (
                      categories.map((c) => (
                        <Select.Option key={c.key} value={c.value}>
                          {c.label}
                        </Select.Option>
                      ))
                    )}
                  </Select>
                </FilterDropdown>
              )}
              render={(value: any, record) => {
                if (isLoading) {
                  return <TextField value="Loading..." />;
                }

                if (isEditing(record.id!)) {
                  if (isCategoryLoading) {
                    return <Skeleton active />;
                  }

                  if (categories.length === 0) {
                    return <p>Error Fetching Categories</p>;
                  }

                  return (
                    <Form.Item
                      name="service_category_id"
                      initialValue={`${value}`}
                      style={{ margin: 0 }}
                    >
                      <Select
                        placeholder="Select Category"
                        style={{ width: 200 }}
                        defaultValue={`${value}`}
                      >
                        {categories.map((c) => (
                          <Select.Option key={c.key} value={c.value}>
                            {c.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  );
                }

                return (
                  <TextField
                    value={
                      serviceCategoryDatas?.data.find(
                        (item) => item.id === value
                      )?.name
                    }
                  />
                );
              }}
            />

            <Table.Column<IService>
              title="Aksi"
              dataIndex="actions"
              key="actions"
              render={(_text, record) => {
                if (isEditing(record.id!)) {
                  return (
                    <Space>
                      <SaveButton {...saveButtonProps} size="small" />
                      <Button {...cancelButtonProps} size="small">
                        Cancel
                      </Button>
                    </Space>
                  );
                }
                return (
                  <Space>
                    <EditButton {...editButtonProps(record.id!)} size="small">
                      Ubah
                    </EditButton>
                    <DeleteButton recordItemId={record.id}>Hapus</DeleteButton>
                  </Space>
                );
              }}
            />
          </Table>
        </Form>
      </List>
    </Col>
  );
};

import { IService, IServiceCategory } from '@components/interfaces';
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
  IResourceComponentsProps,
  List,
  NumberField,
  Row,
  SaveButton,
  Select,
  Space,
  Table,
  TextField,
  useEditableTable,
  useMany,
  useSelect,
} from '@pankod/refine';

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
          operator: 'containss',
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

  const { selectProps } = useSelect<IServiceCategory>({
    resource: 'service_category',
    optionLabel: 'name',
    optionValue: 'id',
    sort: [
      {
        field: 'id',
        order: 'asc',
      },
    ],
    debounce: 500,
  });

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
                      <Input />
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
                    mode="tags"
                    placeholder="Select Category"
                    style={{ width: 200 }}
                    {...selectProps}
                  />
                </FilterDropdown>
              )}
              render={(value: any, record) => {
                if (isLoading) {
                  return <TextField value="Loading..." />;
                }

                if (isEditing(record.id!)) {
                  return (
                    <Form.Item
                      name="service_category_id"
                      initialValue={value}
                      style={{ margin: 0 }}
                    >
                      <Select {...selectProps} />
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

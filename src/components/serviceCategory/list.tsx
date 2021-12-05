import { IServiceCategory } from '@components/interfaces';
import {
  Button,
  Col,
  DateField,
  DeleteButton,
  EditButton,
  Form,
  HttpError,
  Icons,
  Input,
  IResourceComponentsProps,
  List,
  SaveButton,
  Space,
  Table,
  TablePaginationConfig,
  TextField,
  useEditableTable,
} from '@pankod/refine';
import dayjs from '@utility/dayjs';

export const ServiceCategoryList: React.FC<
  IResourceComponentsProps<IServiceCategory>
> = (_props) => {
  const {
    isEditing,
    editButtonProps,
    tableProps,
    saveButtonProps,
    cancelButtonProps,
    searchFormProps,
    formProps,
    tableQueryResult,
  } = useEditableTable<IServiceCategory, HttpError, {}, { name: string }>({
    submitOnEnter: true,
    initialSorter: [
      {
        field: 'id',
        order: 'asc',
      },
    ],
    onSearch: ({ name }) => {
      return [
        {
          field: 'name',
          operator: 'containss',
          value: name,
        },
      ];
    },
  });

  return (
    <Col>
      <Form layout="vertical" {...searchFormProps}>
        <Form.Item label="Cari Kategori Service" name="name">
          <Input
            placeholder="Kategori Service"
            prefix={<Icons.SearchOutlined />}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Cari Kategori Service
          </Button>
        </Form.Item>
      </Form>
      <List
        title="Kategori Service"
        createButtonProps={{ children: 'Buat Kategori Service Baru' }}
        canCreate
      >
        <Form {...formProps}>
          <Table<IServiceCategory> {...tableProps} rowKey="id">
            <Table.Column<IServiceCategory>
              title="No"
              render={(_, __, i) => (
                <p>
                  {((tableProps.pagination as TablePaginationConfig).current! -
                    1) *
                    10 +
                    (i + 1)}
                </p>
              )}
              sorter
            />
            <Table.Column<IServiceCategory>
              key="name"
              dataIndex="name"
              title="Nama Kategori"
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
              sorter
            />
            <Table.Column<IServiceCategory>
              key="updated_at"
              dataIndex="updated_at"
              title="Diperbarui Pada"
              render={(value) => {
                return (
                  <DateField format="LLL" value={dayjs(value).add(7, 'h')} />
                );
              }}
              sorter
            />
            <Table.Column<IServiceCategory>
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
                    <EditButton {...editButtonProps(record.id!)} size="small" />
                    <DeleteButton recordItemId={record.id} />
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

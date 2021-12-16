import type { IAdmin } from '@components';
import {
  Button,
  Col,
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
  TextField,
  useEditableTable,
  useGetIdentity,
} from '@pankod/refine';
import { IUserIdentity } from '@utility';

export const AdminList: React.FC<IResourceComponentsProps<IAdmin>> = (
  _props
) => {
  const { data, isLoading } = useGetIdentity<IUserIdentity>();

  const {
    isEditing,
    editButtonProps,
    tableProps,
    saveButtonProps,
    cancelButtonProps,
    searchFormProps,
    formProps,
  } = useEditableTable<IAdmin, HttpError, {}, Pick<IAdmin, 'name'>>({
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
          operator: 'contains',
          value: name,
        },
      ];
    },
  });

  if (isLoading) return <p>Loading data admin</p>;
  if (!data) return <p>Error mengambil data admin</p>;

  const { adminId } = data;

  return (
    <Col>
      <Form layout="vertical" {...searchFormProps}>
        <Form.Item label="Cari Admin" name="name">
          <Input placeholder="Nama Admin" prefix={<Icons.SearchOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Cari Admin
          </Button>
        </Form.Item>
      </Form>
      <List
        title="Admin"
        createButtonProps={{ children: 'Buat Admin Baru' }}
        canCreate
      >
        <Form {...formProps}>
          <Table {...tableProps} rowKey="id">
            <Table.Column<IAdmin>
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
            <Table.Column<IAdmin>
              key="name"
              dataIndex="name"
              title="Nama"
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
            <Table.Column<IAdmin> key="email" dataIndex="email" title="Email" />
            <Table.Column<IAdmin>
              key="supabase_user_id"
              dataIndex="supabase_user_id"
              title="Status konfirmasi"
              render={(v) => {
                return <p>{v ? 'Sudah' : 'Belum'}</p>;
              }}
            />
            <Table.Column<IAdmin>
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

                if (`${adminId}` === `${record.id}`) {
                  return (
                    <Space>
                      <Button size="small">Akun Saya</Button>
                    </Space>
                  );
                }

                return (
                  <Space>
                    <EditButton {...editButtonProps(record.id!)} size="small">
                      Ubah
                    </EditButton>
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

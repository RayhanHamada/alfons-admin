import type { IKlien } from '@components';
import {
  Button,
  Col,
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
  TextField,
  useEditableTable,
} from '@pankod/refine';

export const KlienList: React.FC<IResourceComponentsProps<IKlien>> = (
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
  } = useEditableTable<IKlien, HttpError, {}, { name: string }>({
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
        <Form.Item label="Cari Klien" name="name">
          <Input placeholder="Nama Klien" prefix={<Icons.SearchOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Cari Klien
          </Button>
        </Form.Item>
      </Form>
      <List
        title="Klien"
        createButtonProps={{ children: 'Buat Klien Baru' }}
        canCreate
      >
        <Form {...formProps}>
          <Table {...tableProps} rowKey="id">
            <Table.Column<IKlien>
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
            <Table.Column<IKlien>
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
            <Table.Column<IKlien>
              key="jenis_kelamin"
              dataIndex="jenis_kelamin"
              title="Jenis Kelamin"
              render={(value, record) => {
                if (isEditing(record.id!)) {
                  return (
                    <Form.Item
                      name="jk"
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
            <Table.Column<IKlien>
              key="phone_number"
              dataIndex="phone_number"
              title="Nomor Telepon"
              render={(value, record) => {
                if (isEditing(record.id!)) {
                  return (
                    <Form.Item
                      name="phone_number"
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

            <Table.Column<IKlien>
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

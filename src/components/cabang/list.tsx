import { ICabang } from '@components/interfaces';
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
  TextField,
  useEditableTable,
} from '@pankod/refine';
import dayjs from '@utility/dayjs';

export const CabangList: React.FC<IResourceComponentsProps<ICabang>> = (
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
  } = useEditableTable<ICabang, HttpError, {}, { name: string }>({
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
        <Form.Item label="Cari Cabang" name="name">
          <Input placeholder="Nama Cabang" prefix={<Icons.SearchOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Cari Cabang
          </Button>
        </Form.Item>
      </Form>
      <List
        title="Cabang Alfons"
        createButtonProps={{ children: 'Buat Cabang Baru' }}
        canCreate
      >
        <Form {...formProps}>
          <Table {...tableProps} rowKey="id">
            <Table.Column<ICabang>
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
            <Table.Column<ICabang>
              key="name"
              dataIndex="name"
              title="Nama Cabang"
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
            <Table.Column<ICabang>
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
            <Table.Column<ICabang>
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

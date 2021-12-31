import type { IStylish } from '@components';
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
  Space,
  Table,
  useTable,
} from '@pankod/refine';

export const StylishList: React.FC<IResourceComponentsProps<IStylish>> = (
  _props
) => {
  const { tableProps, searchFormProps } = useTable<
    IStylish,
    HttpError,
    { name: string }
  >({
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

  return (
    <Col>
      <Form layout="vertical" {...searchFormProps}>
        <Form.Item label="Cari Stylish" name="name">
          <Input placeholder="Nama Stylish" prefix={<Icons.SearchOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Cari Stylish
          </Button>
        </Form.Item>
      </Form>
      <List
        title="Stylish"
        createButtonProps={{ children: 'Buat Stylish Baru' }}
        canCreate
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column<IStylish>
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
          <Table.Column<IStylish> key="name" dataIndex="name" title="Nama" />
          <Table.Column<IStylish>
            key="phone_number"
            dataIndex="phone_number"
            title="Nomor Telepon"
          />
          <Table.Column<IStylish>
            title="Aksi"
            dataIndex="actions"
            key="actions"
            render={(_text, record) => {
              return (
                <Space>
                  <EditButton size="small" recordItemId={record.id}>
                    Ubah
                  </EditButton>
                  <DeleteButton recordItemId={record.id}>Hapus</DeleteButton>
                </Space>
              );
            }}
          />
        </Table>
      </List>
    </Col>
  );
};

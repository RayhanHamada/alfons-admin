import type { IService } from '@components';
import {
  Button,
  Col,
  Drawer,
  Form,
  HttpError,
  Icons,
  Input,
  List,
  NumberField,
  Space,
  Table,
  useTable,
} from '@pankod/refine';
import useAppointmentStore from '@utility/hooks/useAppointmentStore';

const { PlusOutlined, SearchOutlined } = Icons;

export const ServiceDrawer: React.FC = (_props) => {
  const { isDrawerOpen, closeDrawer, addServiceId, serviceIds } =
    useAppointmentStore();

  const { tableProps, searchFormProps } = useTable<
    IService,
    HttpError,
    {
      name: string;
    }
  >({
    resource: 'service',
    onSearch: ({ name }) => {
      return [
        {
          field: 'name',
          operator: 'contains',
          value: name,
        },
      ];
    },
    initialSorter: [
      {
        field: 'service_category_id',
        order: 'asc',
      },
    ],
    initialPageSize: 8,
  });

  /**
   * filter datasource
   */
  if (tableProps.dataSource) {
    tableProps.dataSource = tableProps.dataSource.filter(
      (s) => !serviceIds.includes(parseInt(s.id!))
    );
  }

  return (
    <Drawer
      title="Pilih Service"
      placement="right"
      size="large"
      onClose={closeDrawer}
      visible={isDrawerOpen}
    >
      <Col>
        <Form layout="vertical" {...searchFormProps}>
          <Form.Item label="Cari Service" name="name">
            <Input
              placeholder="Nama Service"
              prefix={<SearchOutlined />}
              autoComplete="off"
            />
          </Form.Item>
        </Form>
        <List
          resource="service"
          pageHeaderProps={{ title: undefined }}
          canCreate={false}
        >
          <Table {...tableProps} rowKey="id" size="small">
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
            />
            <Table.Column<IService>
              key="cost_estimate"
              dataIndex="cost_estimate"
              title="Perkiraan Harga"
              render={(value) => (
                <NumberField
                  value={value}
                  options={{ currency: 'idr', style: 'currency' }}
                />
              )}
            />

            <Table.Column<IService>
              title="Aksi"
              dataIndex="actions"
              key="actions"
              render={(_, record) => (
                <Space>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => addServiceId(parseInt(record.id!))}
                  >
                    <PlusOutlined />
                  </Button>
                </Space>
              )}
            />
          </Table>
        </List>
      </Col>
    </Drawer>
  );
};

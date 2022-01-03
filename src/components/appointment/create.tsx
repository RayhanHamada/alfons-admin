import type { IKlien, IService } from '@components';
import {
  AntdList,
  Button,
  Checkbox,
  Col,
  Create,
  Form,
  HttpError,
  Input,
  List,
  NumberField,
  Radio,
  Select,
  Space,
  Table,
  Typography,
  useMany,
  useSelect,
  useTable,
} from '@pankod/refine';
import { useState } from 'react';

const { Title } = Typography;

type FormValue = {
  klienId?: number;

  /**
   * untuk klien baru
   */
  klienName?: string;

  /**
   * untuk klien baru
   */
  klienPhone: string;

  /**
   * untuk klien baru
   */
  jenisKelamin: 'PRIA' | 'WANITA';
};

export const AppointmentCreate: React.FC = (_props) => {
  const [form] = Form.useForm<FormValue>();
  const [klienBaru, setKlienBaru] = useState(false);
  const [serviceIds, setServiceIds] = useState<number[]>([]);

  const { selectProps: selectKlienProps } = useSelect<IKlien>({
    resource: 'klien',
    optionLabel: 'name',
    optionValue: 'id',
    onSearch: (value) => [
      {
        field: 'name',
        operator: 'contains',
        value,
      },
    ],
    fetchSize: 20,
  });

  const { tableProps } = useTable<
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

  const { data: serviceOrderedData, isError: isServiceOrderedError } =
    useMany<IService>({
      resource: 'service',
      ids: serviceIds.map((v) => `${v}`),
    });

  const checkboxOnChange = (e: any) => {
    setKlienBaru(e.target.checked);
  };

  const onFinish = async (v: FormValue) => {
    console.log(v);
    console.log(klienBaru);
  };

  const addServiceId = (id: number) => {
    if (id in serviceIds) return;
    setServiceIds((ids) => [...ids, id]);
  };

  const removeServiceId = (id: number) => {
    setServiceIds((sids) => sids.filter((v) => v != id));
  };

  if (isServiceOrderedError || !serviceOrderedData)
    return <p>Gagal mengambil data</p>;

  return (
    <Create title="Buat Appointment">
      <Col>
        <Form
          title="Data Pemesan"
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Title level={4}>Data pemesan</Title>
          <hr />
          <Form.Item>
            <Checkbox onChange={checkboxOnChange}>Klien Baru</Checkbox>
          </Form.Item>

          {klienBaru ? (
            <>
              <Form.Item
                label="Nama Klien"
                name="klienName"
                style={{ width: 400 }}
                requiredMark
                required
              >
                <Input type="text" placeholder="Masukkan nama klien baru" />
              </Form.Item>
              <Form.Item
                label="Nomor Telepon Klien"
                name="klienPhone"
                style={{ width: 400 }}
                requiredMark
                required
              >
                <Input type="text" placeholder="Masukkan No. HP klien baru" />
              </Form.Item>
              <Form.Item
                label="Jenis kelamin"
                name="jenis_kelamin"
                initialValue="PRIA"
                key="jenisKelamin"
                requiredMark
                required
              >
                <Radio.Group>
                  <Radio value="PRIA">Pria</Radio>
                  <Radio value="WANITA">Wanita</Radio>
                </Radio.Group>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                label="Nama klien"
                name="klienId"
                style={{ width: 400 }}
                requiredMark
                required
              >
                <Select
                  {...selectKlienProps}
                  placeholder="Cari Klien"
                  showSearch
                />
              </Form.Item>
            </>
          )}

          <br />
          <Title level={4}>Pilih Service</Title>
          <hr />
          <List resource="service" title={() => ''} canCreate={false}>
            <Table {...tableProps} title={() => ''} rowKey="id" size="small">
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
                      onClick={() => addServiceId(parseInt(record.id!))}
                    >
                      Tambahkan
                    </Button>
                  </Space>
                )}
              />
            </Table>
          </List>
          <br />
          <Title level={4}>Service yang dipilih</Title>
          <AntdList
            dataSource={serviceOrderedData.data}
            renderItem={(item, i) => (
              <AntdList.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => removeServiceId(parseInt(item.id!))}
                    danger
                  >
                    Hapus
                  </Button>,
                ]}
              >
                <AntdList.Item.Meta title={`${i + 1}. ${item.name}`} />
                <NumberField
                  value={item.cost_estimate}
                  options={{ currency: 'idr', style: 'currency' }}
                />
              </AntdList.Item>
            )}
          />
          {serviceIds.length !== 0 ? (
            <>
              <hr />
              <AntdList.Item
                actions={[
                  <Button
                    type="primary"
                    danger
                    style={{ visibility: 'hidden' }}
                  >
                    Hapus
                  </Button>,
                ]}
              >
                <AntdList.Item.Meta title="Perkiraan Total Harga" />
                <NumberField
                  value={serviceOrderedData.data.reduce(
                    (p, c) => p + c.cost_estimate,
                    0
                  )}
                  options={{ currency: 'idr', style: 'currency' }}
                />
              </AntdList.Item>
            </>
          ) : undefined}
        </Form>
      </Col>
    </Create>
  );
};

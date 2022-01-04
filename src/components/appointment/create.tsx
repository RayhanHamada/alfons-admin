import type { IKlien, IService } from '@components';
import {
  AntdList,
  Button,
  Checkbox,
  Col,
  Create,
  Form,
  Icons,
  Input,
  NumberField,
  Radio,
  Select,
  TextField,
  Typography,
  useMany,
  useSelect,
} from '@pankod/refine';
import useAppointmentStore from '@utility/hooks/useAppointmentStore';
import { useState } from 'react';
import { ServiceDrawer } from './serviceDrawer';

const { Title } = Typography;
const { PlusOutlined, DeleteOutlined } = Icons;

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
  const { toggleDrawer, serviceIds, removeServiceId } = useAppointmentStore();

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

  if (isServiceOrderedError || !serviceOrderedData)
    return <p>Gagal mengambil data</p>;

  return (
    <Create title="Buat Appointment">
      <Col>
        {/* Form Data Pemesan */}
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

          {/* header list service yang dipilih */}
          <Title level={4}>Order Service</Title>
          <hr />
          <AntdList.Item
            actions={[
              <Button type="primary" danger style={{ visibility: 'hidden' }}>
                <PlusOutlined />
              </Button>,
            ]}
          >
            <AntdList.Item.Meta
              style={{ fontWeight: 'bolder' }}
              title={<Title level={5}>Jenis Service</Title>}
            />
            <TextField
              strong
              value={<Title level={5}>Perkiraan Harga</Title>}
            />
          </AntdList.Item>

          {/* list service yang dipilih */}
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
                    <DeleteOutlined />
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

          <Button onClick={toggleDrawer}>Tambahkan Service</Button>

          {/* perkiraan total harga */}
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
                    <DeleteOutlined />
                  </Button>,
                ]}
              >
                <AntdList.Item.Meta
                  style={{ fontWeight: 'bold' }}
                  title="Total Perkiraan Harga"
                />
                <NumberField
                  value={serviceOrderedData.data.reduce(
                    (p, c) => p + c.cost_estimate,
                    0
                  )}
                  options={{ currency: 'idr', style: 'currency' }}
                  strong
                />
              </AntdList.Item>
            </>
          ) : undefined}
        </Form>
        <ServiceDrawer />
      </Col>
    </Create>
  );
};

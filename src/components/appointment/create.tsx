import type { IKlien } from '@components';
import {
  Checkbox,
  Col,
  Create,
  Form,
  Input,
  Radio,
  Select,
  Typography,
  useSelect,
} from '@pankod/refine';
import { useState } from 'react';
import { OrderedServiceList } from './orderedServiceList';
import { ServiceDrawer } from './serviceDrawer';

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

  const checkboxOnChange = (e: any) => {
    setKlienBaru(e.target.checked);
  };

  const onFinish = async (v: FormValue) => {
    console.log(v);
    console.log(klienBaru);
  };

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
          <OrderedServiceList />
        </Form>
        <ServiceDrawer />
      </Col>
    </Create>
  );
};

import type { IKlien } from '@components';
import {
  Button,
  Col,
  Form,
  Select,
  Typography,
  useSelect,
} from '@pankod/refine';
import type { CreateAppointmentUserDataFormValue } from '@utility/hooks/useCreateAppointmentStore';
import useCreateAppointmentStore from '@utility/hooks/useCreateAppointmentStore';
import { MouseEventHandler } from 'react';

const { Title, Text } = Typography;

const FormDataKlien: React.FC = (_props) => {
  const { toggleCreateKlienDrawer } = useCreateAppointmentStore();

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

  const onClick: MouseEventHandler<HTMLButtonElement> = (_e) => {
    toggleCreateKlienDrawer();
  };

  const onFinish = (v: CreateAppointmentUserDataFormValue) => {};

  return (
    <Form title="Data Pemesan" layout="vertical">
      <Title level={4}>Data pemesan</Title>
      <hr />

      <Form.Item
        label="Nama klien"
        name="klienId"
        style={{ width: 400 }}
        requiredMark
        required
      >
        <Select {...selectKlienProps} placeholder="Cari Klien" showSearch />
      </Form.Item>
      <Col style={{ textAlign: 'center' }}>
        <Text>Atau</Text>
        <br />
        <Button onClick={onClick}>Buat Klien Baru</Button>
      </Col>
    </Form>
  );
};

export default FormDataKlien;

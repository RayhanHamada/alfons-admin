import type { IKlien } from '@components';
import {
  Button,
  Form,
  Row,
  Select,
  Typography,
  useSelect,
} from '@pankod/refine';
import type { CreateAppointmentUserDataFormValue } from '@utility/hooks/useCreateAppointmentStore';
import useCreateAppointmentStore from '@utility/hooks/useCreateAppointmentStore';
import { MouseEventHandler } from 'react';

const { Title, Text } = Typography;

const FormDataKlien: React.FC = (_props) => {
  const { toggleCreateKlienDrawer, setKlienId } = useCreateAppointmentStore();

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
      <Row>
        <Title level={4}>Data pemesan</Title>
        <hr />
        <Button onClick={onClick} style={{ width: 200 }}>
          Buat Klien Baru
        </Button>
      </Row>
      <hr />

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
          onChange={(value) => {
            setKlienId(value as any);
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default FormDataKlien;

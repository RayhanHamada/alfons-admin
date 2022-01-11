import { Form, Input, Row, Typography } from '@pankod/refine';
import useCreateAppointmentStore from '@utility/hooks/useCreateAppointmentStore';
import { ChangeEventHandler } from 'react';

const { Title } = Typography;

export const Note: React.FC = (_props) => {
  const setNote = useCreateAppointmentStore((state) => state.setNote);
  const onTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setNote(e.currentTarget.value);
  };

  return (
    <Form title="Catatan">
      <Row>
        <Title level={4}>Catatan</Title>
      </Row>
      <hr />
      <Form.Item>
        <Input.TextArea
          style={{ height: 200 }}
          placeholder="Warna atau ukuran rambut, Kode warna saat perawatan terakhir, treatment note....."
          onChange={onTextAreaChange}
        />
      </Form.Item>
    </Form>
  );
};

import { Button, Col, Typography } from '@pankod/refine';
import { MouseEventHandler } from 'react';

const { Title } = Typography;

export const Schedule: React.FC = (_props) => {
  const onAturClick: MouseEventHandler<HTMLButtonElement> = (e) => {};
  return (
    <>
      <Col>
        <Title level={4}>Pilih Stylish dan Jadwal</Title>
        <Button onClick={onAturClick}>Atur Schedule</Button>
      </Col>
    </>
  );
};

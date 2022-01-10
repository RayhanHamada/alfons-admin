import { Button, Col, Row, Typography, useOne } from '@pankod/refine';
import useCreateAppointmentStore from '@utility/hooks/useCreateAppointmentStore';
import { MouseEventHandler } from 'react';
import { IJam, IStylish } from '..';
import { CreateScheduleDrawer } from './CreateScheduleDrawer';

const { Title, Text } = Typography;

export const Schedule: React.FC = (_props) => {
  const { toggleCreateScheduleDrawer, jamId, stylishId, tanggal } =
    useCreateAppointmentStore();

  const onAturClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    toggleCreateScheduleDrawer();
  };

  const {
    data: jamData,
    isError: isJamError,
    isLoading: isJamLoading,
  } = useOne<IJam>({
    resource: 'jam',
    id: jamId!,
    queryOptions: {
      enabled: !!jamId,
    },
  });

  const {
    data: stylishData,
    isError: isStylishError,
    isLoading: isStylishLoading,
  } = useOne<IStylish>({
    resource: 'stylish',
    id: `${stylishId!}`,
    queryOptions: {
      enabled: !!stylishId,
    },
  });

  return (
    <>
      <Col>
        <Row>
          <Title level={4}>Pilih Stylish dan Jadwal</Title>
          <Button onClick={onAturClick} style={{ marginLeft: 20 }}>
            Atur Schedule
          </Button>
        </Row>
        <Title level={5}>Stylish</Title>

        <Text>
          {!isStylishError || !isStylishLoading
            ? stylishData
              ? stylishData.data.name
              : ''
            : ''}
        </Text>
        <Title level={5}>Tanggal</Title>
        <Text>{tanggal?.format('dddd, DD MMMM YYYY')}</Text>
        <Title level={5}>Jam</Title>
        <Text>
          {!isJamError || !isJamLoading
            ? jamData
              ? jamData.data.pukul
              : ''
            : ''}
        </Text>
      </Col>
      <CreateScheduleDrawer />
    </>
  );
};

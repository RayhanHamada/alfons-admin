import { Button, Col, Row, Spin, Typography, useOne } from '@pankod/refine';
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
    id: stylishId?.toString() ?? '',
    queryOptions: {
      enabled: !!stylishId,
    },
  });

  return (
    <>
      <Col>
        <Row>
          <Title level={4}>Pilih Stylish dan Jadwal</Title>
          <hr />
          <Button onClick={onAturClick} style={{ width: 200 }}>
            Atur Schedule
          </Button>
        </Row>
        <hr />
        <Title level={5}>Stylish</Title>

        {isStylishError ? (
          <Text>Gagal mengambil data stylish</Text>
        ) : isStylishLoading ? (
          <Spin spinning />
        ) : (
          <Text>{stylishData?.data.name}</Text>
        )}

        <Title level={5}>Tanggal</Title>
        <Text>{tanggal?.format('dddd, DD MMMM YYYY')}</Text>
        <Title level={5}>Jam</Title>
        {isJamError ? (
          <Text>Gagal mengambil data jam</Text>
        ) : isJamLoading ? (
          <Spin spinning />
        ) : (
          <Text>{jamData?.data.pukul}</Text>
        )}
      </Col>
      <CreateScheduleDrawer />
    </>
  );
};

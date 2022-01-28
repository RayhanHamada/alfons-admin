import type { IKlien } from '@components';
import {
  Button,
  Form,
  Row,
  Select,
  Spin,
  Typography,
  useOne,
  useSelect,
} from '@pankod/refine';
import { Dayjs } from '@utility/dayjs';
import type { CreateAppointmentUserDataFormValue } from '@utility/hooks/useCreateAppointmentStore';
import useCreateAppointmentStore from '@utility/hooks/useCreateAppointmentStore';
import { MouseEventHandler, useState } from 'react';

const { Title, Text } = Typography;

const FormDataKlien: React.FC = (_props) => {
  const { toggleCreateKlienDrawer, setKlienId, klienId } =
    useCreateAppointmentStore();

  const [futureAppointment, setFutureAppointment] = useState<Dayjs | undefined>(
    undefined
  );

  const {
    data: klienData,
    isError: isKlienError,
    isLoading: isKlienLoading,
  } = useOne<IKlien>({
    resource: 'klien',
    id: klienId?.toString() ?? '',
    queryOptions: {
      enabled: !!klienId,
    },
  });

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

  const onSelectChange = async (value: string) => {
    // /**
    //  * check if this user already has future appointment
    //  */
    // const { error, data } = await supabaseBrowserClient
    //   .from('appointment')
    //   .select('date, cancel, done')
    //   .gt('date', dayjs().format('MM/DD/YYYY'))
    //   .eq('cancel', false);

    // if (error) {
    //   await message.error(
    //     'Gagal mengecek dan mengambil data appointment user ini',
    //     1
    //   );
    // }

    // if (!data) {
    //   setKlienId(value);
    //   setFutureAppointment(undefined);
    //   return;
    // }

    // setFutureAppointment(dayjs(data[0].date, 'MM/DD/YYYY'));
    setKlienId(parseInt(value));
  };

  const onFinish = (v: CreateAppointmentUserDataFormValue) => {};

  return (
    <Form title="Data Pemesan" layout="vertical">
      <Row>
        <Title level={4}>Data Pemesan</Title>
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
          onChange={onSelectChange as any}
        />
      </Form.Item>
      {futureAppointment ? (
        <Text type="danger">
          Klien ini mempunyai appointment aktif pada tanggal
          {futureAppointment.format('dddd, DD MMMM YYYY')}
        </Text>
      ) : undefined}

      {isKlienError ? (
        <Text>Gagal mengambil data klien</Text>
      ) : isKlienLoading ? (
        <Spin spinning />
      ) : klienData ? (
        <>
          <Title level={5}>Nama</Title>
          {klienData?.data.jenis_kelamin === 'PRIA' ? 'Tn. ' : 'Ny. '}
          {klienData?.data.name}
          <Title level={5}>Nomor Telepon</Title>
          {klienData?.data.phone_number}
          <Title level={5}>Jenis Kelamin</Title>
          {klienData?.data.jenis_kelamin.toLowerCase()}
        </>
      ) : undefined}
    </Form>
  );
};

export default FormDataKlien;

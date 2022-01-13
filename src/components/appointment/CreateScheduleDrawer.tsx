import type { IAppointment, IJam } from '@components';
import type { IUserIdentity } from '@customTypes/authProvider';
import {
  Button,
  Calendar,
  Drawer,
  Form,
  message,
  Radio,
  RadioChangeEvent,
  Select,
  Spin,
  Typography,
  useGetIdentity,
  useList,
  useSelect,
} from '@pankod/refine';
import { dayjs, Dayjs } from '@utility/dayjs';
import useCreateAppointmentStore from '@utility/hooks/useCreateAppointmentStore';
import { supabaseBrowserClient } from '@utility/supabaseBrowserClient';
import { MouseEventHandler, useEffect, useState } from 'react';

type OnRadioChange = (e: RadioChangeEvent) => void;
type OnCalendarChange = (date: Dayjs) => void;
type CalendarDisabledDate = (date: Dayjs) => boolean;
type OnSelectChange = (e: number) => void;

const { Title, Text } = Typography;

export const CreateScheduleDrawer: React.FC = (_props) => {
  const { isCreateScheduleDrawerOpen, closeCreateScheduleDrawer, setSchedule } =
    useCreateAppointmentStore();

  const [byDate, setByDate] = useState(true);
  const {
    data: identityData,
    isError: isIdentityError,
    isLoading: isIdentityLoading,
  } = useGetIdentity<IUserIdentity>();

  const [tanggal, setTanggal] = useState<Dayjs>(dayjs().startOf('day'));
  const [stylishId, setStylishId] = useState<number | undefined>(undefined);
  const [jamId, setJamId] = useState<string | undefined>(undefined);

  const [availableJam, setAvailableJam] = useState<IJam[]>([]);

  const [form] = Form.useForm();
  const { selectProps: selectStylishProps } = useSelect({
    resource: 'stylish',
    filters: [
      {
        field: `${tanggal.format('dddd').toLowerCase()}_available`,
        operator: 'eq',
        value: true,
      },
    ],
    optionValue: 'id',
    optionLabel: 'name',
    fetchSize: 20,
    onSearch: (value) => [
      {
        field: 'name',
        operator: 'contains',
        value,
      },
    ],
  });

  const {
    data: appointmentData,
    isError: isAppointmentError,
    isLoading: isAppointmentLoading,
  } = useList<IAppointment>({
    resource: 'appointment',
    config: {
      filters: [
        /**
         * hanya fetch appointment yang tidak di cancel
         */
        {
          field: 'cancel',
          operator: 'eq',
          value: false,
        },
        /**
         * filter hanya untuk appointment di cabang ini
         */
        {
          field: 'cabang_id',
          operator: 'eq',
          value: identityData?.cabangId,
        },

        /**
         * filter hanya untuk di tanggal ini
         */
        {
          field: 'date',
          operator: 'eq',
          value: tanggal.format('MM/DD/YYYY'),
        },

        /**
         * filter hanya untuk stylish ini
         */
        {
          field: 'stylish_id',
          operator: 'eq',
          value: stylishId,
        },
      ],
      pagination: {
        pageSize: 24,
      },
    },
    queryOptions: {
      enabled: !!stylishId && !!identityData,
    },
  });

  useEffect(() => {
    (async () => {
      if (identityData && appointmentData && stylishId) {
        const jamAppointment = appointmentData.data.map((a) => a.jam_id);
        const { error, data } = await supabaseBrowserClient
          .from<IJam>('jam')
          .select('*')
          .eq('cabang_id', identityData.cabangId);

        if (error || !data) {
          await message.error('Error saat mengambil data jam', 1);
          return;
        }

        /**
         * filter untuk menampilkan data jam yang tidak ada di
         * appointment yang di ambil
         */
        const filteredJam = data.filter(
          (j) => !jamAppointment.includes(parseInt(j.id))
        );

        setAvailableJam(filteredJam);
      }
    })();
  }, [identityData, appointmentData, stylishId]);

  const onRadioChange: OnRadioChange = (e) => {
    if (e.target.value === 'STYLISH') {
      setByDate(false);
      return;
    }

    setByDate(true);
  };

  const onCalendarChange: OnCalendarChange = (date) => {
    setTanggal(date);
    setStylishId(undefined);
    form.resetFields(['stylish']);
    setAvailableJam([]);
  };

  /**
   * hari apa saja yang tidak bisa di pilih
   * - hari kemarin
   * - hari libur nasional (jika diperlukan)
   */
  // TODO tambahkan hari libur nasional jika diperlukan
  const calendarDisabledDate: CalendarDisabledDate = (date) =>
    date.isBefore(dayjs().startOf('day'));

  const onSelectStylishChange: OnSelectChange = (e) => {
    setStylishId(e);
  };

  const onSelectJamChange = (v: number) => {
    setJamId(`${v}`);
  };

  const onSetSchedule: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (!(stylishId && jamId)) {
      await message.error('Harap pilih stylish dan jam', 1);
      return;
    }

    setSchedule({
      stylishId,
      jamId,
      tanggal,
    });
  };

  if (isIdentityLoading) return <Text>Mengambil data admin</Text>;
  if (isIdentityError)
    return <Text>Gagal mengambil data admin, coba refresh</Text>;

  return (
    <Drawer
      visible={isCreateScheduleDrawerOpen}
      size="large"
      title={<Title level={4}>Pilih Jadwal</Title>}
      onClose={closeCreateScheduleDrawer}
    >
      <Form>
        <Form.Item label="Pilih Berdasarkan" name="by" initialValue="TANGGAL">
          <Radio.Group onChange={onRadioChange}>
            <Radio value="TANGGAL">Tanggal</Radio>
            <Radio value="STYLISH">Stylish</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      <Form
        form={form}
        onFinish={(e) => {
          console.log(e);
        }}
        layout="vertical"
      >
        {byDate ? (
          <>
            <Calendar
              value={tanggal}
              fullscreen={false}
              disabledDate={calendarDisabledDate}
              onChange={onCalendarChange}
            />
            <Text style={{ fontWeight: 'bold' }}>
              Dipilih: {tanggal.format('dddd, DD MMMM YYYY')}
            </Text>
            <br />
            <hr />

            <Form.Item name="stylish" label="Stylish yang tersedia">
              <Select
                style={{ width: 500 }}
                {...selectStylishProps}
                placeholder="Pilih Stylish"
                onChange={onSelectStylishChange as any}
                showSearch
              />
            </Form.Item>
            <br />
            {isAppointmentLoading ? (
              <Spin spinning />
            ) : isAppointmentError ? (
              <Text>Gagal mengambil data jam yang tersedia</Text>
            ) : availableJam.length === 0 ? (
              stylishId ? (
                <Text>
                  Tidak ada jam kosong untuk stylish ini pada tanggal tersebut
                </Text>
              ) : undefined
            ) : (
              <Form.Item name="jam" label="Jam yang tersedia">
                <Select
                  style={{ width: 500 }}
                  placeholder="Pilih jam yang tersedia"
                  onChange={onSelectJamChange}
                >
                  {availableJam.map((j) => (
                    <Select.Option value={j.id} key={j.id}>
                      {j.pukul}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </>
        ) : undefined}
        <Button type="primary" onClick={onSetSchedule}>
          Tetapkan Jadwal
        </Button>
      </Form>
    </Drawer>
  );
};

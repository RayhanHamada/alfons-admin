import { IUserIdentity } from '@customTypes/authProvider';
import { Button, Col, Create, message, useGetIdentity } from '@pankod/refine';
import useCreateAppointmentStore from '@utility/hooks/useCreateAppointmentStore';
import { supabaseBrowserClient } from '@utility/supabaseBrowserClient';
import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';
import { CreateUserDrawer } from './CreateUserDrawer';
import FormDataKlien from './FormDataKlien';
import { Note } from './Note';
import OrderedServiceList from './OrderedServiceList';
import { Schedule } from './Schedule';
import ServiceDrawer from './ServiceDrawer';

export const AppointmentCreate: React.FC = (_props) => {
  const { jamId, serviceIds, klienId, note, stylishId, tanggal } =
    useCreateAppointmentStore();

  const { data: currentAdminData } = useGetIdentity<IUserIdentity>();
  const router = useRouter();

  const createAppointment: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (
      jamId &&
      serviceIds.length !== 0 &&
      klienId !== '' &&
      stylishId &&
      tanggal &&
      currentAdminData
    ) {
      console.log('clicked');
      /**
       * check jika ada appointment dengan klienId, stylishId, tanggal, dan jam yang sama
       */
      const { error: checkError, data: checkData } = await supabaseBrowserClient
        .from('appointment')
        .select(`klien_id, stylish_id, jam_id, date`)
        .eq('date', tanggal.format('MM/DD/YYYY'))
        .eq('jam_id', parseInt(jamId))
        .eq('stylish_id', stylishId);

      console.log('clicked');
      if (checkError) {
        await message.error('Error saat mengecek data appointment serupa', 1);
        return;
      }

      if (checkData!.length > 0) {
        await message.error(
          'Ada appointment dengan jadwal dan stylish yang sama, silahkan pilih lagi',
          1
        );
        return;
      }

      const { error: insertAppointmentError, data: insertAppointmentData } =
        await supabaseBrowserClient
          .from('appointment')
          .insert({
            jam_id: parseInt(jamId),
            cabang_id: currentAdminData.cabangId,
            date: tanggal.format('MM/DD/YYYY'),
            klien_id: parseInt(klienId),
            stylish_id: stylishId,
            note,
          })
          .single();

      if (insertAppointmentError || !insertAppointmentData) {
        await message.error('Gagal memasukkan data appointment !', 2);
        return;
      }

      serviceIds.forEach(async (v) => {
        await supabaseBrowserClient.from('rendered_service').insert({
          appointment_id: insertAppointmentData.id,
          service_id: v,
        });
      });

      await message.success('Sukses membuat appointment !', 1);
      router.reload();

      return;
    }

    await message.error(
      'Gagal memasukkan data appointment, pastikan form telah terisi semua !',
      1
    );
  };
  return (
    <Create title="Buat Appointment" saveButtonProps={{ hidden: true }}>
      <Col>
        <FormDataKlien />
        <br />
        <OrderedServiceList />
        <br />
        <br />
        <Schedule />

        {/* drawers */}
        <ServiceDrawer />
        <CreateUserDrawer />
        <br />
        <Note />
        <br />
        <Button
          type="primary"
          style={{ width: '100%' }}
          onClick={createAppointment}
        >
          Buat Appointment
        </Button>
      </Col>
    </Create>
  );
};

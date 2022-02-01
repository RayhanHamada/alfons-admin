import { IUserIdentity } from '@customTypes/authProvider';
import { Button, Col, Create, useGetIdentity } from '@pankod/refine';
import useCreateAppointmentStore from '@utility/hooks/useCreateAppointmentStore';
import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';
import { CreateUserDrawer } from './CreateUserDrawer';
import FormDataKlien from './FormDataKlien';
import { Note } from './Note';
import OrderedServiceList from './orderedServiceList';
import { Schedule } from './Schedule';
import ServiceDrawer from './serviceDrawer';

export const AppointmentCreate: React.FC = (_props) => {
  const { jamId, serviceIds, klienId, note, stylishId, tanggal } =
    useCreateAppointmentStore();

  const store = useCreateAppointmentStore();

  const { data: currentAdminData } = useGetIdentity<IUserIdentity>();
  const router = useRouter();

  const createAppointment: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {};

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

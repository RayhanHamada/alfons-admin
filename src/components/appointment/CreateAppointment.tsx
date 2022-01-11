import { Button, Col, Create } from '@pankod/refine';
import { CreateUserDrawer } from './CreateUserDrawer';
import FormDataKlien from './FormDataKlien';
import { Note } from './Note';
import OrderedServiceList from './OrderedServiceList';
import { Schedule } from './Schedule';
import ServiceDrawer from './ServiceDrawer';

export const AppointmentCreate: React.FC = (_props) => {
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
        <Button type="primary" style={{ width: '100%' }}>
          Buat Appointment
        </Button>
      </Col>
    </Create>
  );
};

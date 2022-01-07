import { Col, Create } from '@pankod/refine';
import { CreateUserDrawer } from './CreateUserDrawer';
import FormDataKlien from './FormDataKlien';
import OrderedServiceList from './OrderedServiceList';
import { Schedule } from './Schedule';
import ServiceDrawer from './ServiceDrawer';

export const AppointmentCreate: React.FC = (_props) => {
  return (
    <Create title="Buat Appointment">
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
      </Col>
    </Create>
  );
};

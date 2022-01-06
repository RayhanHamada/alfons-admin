import { Col, Create, Typography } from '@pankod/refine';
import { CreateUserDrawer } from './CreateUserDrawer';
import FormDataKlien from './FormDataKlien';
import OrderedServiceList from './OrderedServiceList';
import ServiceDrawer from './ServiceDrawer';

const { Title } = Typography;

export const AppointmentCreate: React.FC = (_props) => {
  return (
    <Create title="Buat Appointment">
      <Col>
        <FormDataKlien />
        <br />
        <OrderedServiceList />
        <br />
        <br />
        <Title level={4}>Pilih Stylish dan Jadwal</Title>

        {/* drawers */}
        <ServiceDrawer />
        <CreateUserDrawer />
      </Col>
    </Create>
  );
};
